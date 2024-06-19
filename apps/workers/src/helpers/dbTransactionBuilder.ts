import BigNumber from 'bignumber.js'
import { QuestId } from 'content'
import { EventId, Message, MessageApi, MessageType } from 'common'
import { AuditType, Prisma, PrismaClient } from 'database'
import { ResultAsync, ok, err } from 'neverthrow'
import { TokenPriceClient } from '../token-price-client'

export type DbOperation = () => Prisma.PrismaPromise<any>

export type DbTransactionBuilder = ReturnType<typeof DbTransactionBuilder>
export const DbTransactionBuilder = ({
  dbClient,
  tokenPriceClient,
  messageApi
}: {
  dbClient: PrismaClient
  tokenPriceClient: TokenPriceClient
  messageApi: MessageApi
}) => {
  const operations: DbOperation[] = []

  const add = (...values: DbOperation[]) => {
    for (const operation of values) {
      operations.push(operation)
    }

    return api
  }

  const questRequirementCompleted = ({
    questId,
    requirementId,
    userId,
    transactionId,
    traceId
  }: {
    userId: string
    questId: QuestId
    requirementId: EventId
    transactionId: string
    traceId: string
  }) => {
    operations.push(
      () =>
        dbClient.completedQuestRequirement.create({
          data: {
            userId,
            questId,
            requirementId
          }
        }),
      () => {
        const message = dbClient.message.create({
          data: {
            userId,
            data: {
              type: 'QuestRequirementCompleted',
              questId,
              requirementId
            }
          }
        })

        message.then((message) => {
          messageApi.send(
            userId,
            {
              type: 'QuestRequirementCompleted',
              questId,
              traceId,
              requirementId
            },
            message.id
          )
        })

        return message
      },
      () =>
        dbClient.event.update({
          where: {
            transactionId
          },
          data: {
            questId,
            userId
          }
        })
    )

    return api
  }

  const getXrdPrice = (
    value: string | undefined
  ): ResultAsync<{ xrdUsdValue: number; xrdAmount: BigNumber }, { reason: string }> => {
    const result = value ? ok(BigNumber(value)) : err({ reason: 'xrdAmountNotFound' })

    return result.asyncAndThen((xrdAmount) =>
      tokenPriceClient
        .getXrdPrice()
        .mapErr(() => ({ reason: 'CouldNotGetXrdCurrentPriceError' }))
        .map((xrdPrice) => ({
          xrdUsdValue: xrdAmount.multipliedBy(xrdPrice).toNumber(),
          xrdAmount
        }))
    )
  }

  const addXrdDepositToAuditTable = ({
    userId,
    transactionId,
    xrdAmount
  }: {
    userId: string
    transactionId: string
    xrdAmount: string
  }) =>
    getXrdPrice(xrdAmount)
      .map(({ xrdUsdValue }) =>
        operations.push(() =>
          dbClient.audit.create({
            data: {
              transactionId,
              userId,
              type: AuditType.DIRECT_DEPOSIT,
              xrdUsdValue
            }
          })
        )
      )
      .map(() => api)

  const helpers = { questRequirementCompleted, addXrdDepositToAuditTable } as const

  const exec = () =>
    ResultAsync.fromPromise(
      dbClient.$transaction(async () => {
        const results = []
        for (const operation of operations) {
          results.push(await operation())
        }
        return results
      }),
      (error) => error as Error
    )

  const api = { add, exec, helpers }

  return api
}
