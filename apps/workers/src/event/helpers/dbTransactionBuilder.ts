import BigNumber from 'bignumber.js'
import { EventId, QuestId } from 'content'
import { AuditType, Prisma, PrismaClient } from 'database'
import { ResultAsync, ok, err } from 'neverthrow'
import { TokenPriceClient } from './../../token-price-client'
import { getAmountFromDepositEvent } from './getAmountFromDepositEvent'
import { getFirstTransactionAuditResources } from './getFirstTransactionAuditResources'
import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'

export type DbOperation = () => Prisma.PrismaPromise<any>

export type DbTransactionBuilder = ReturnType<typeof DbTransactionBuilder>
export const DbTransactionBuilder = ({
  dbClient,
  tokenPriceClient
}: {
  dbClient: PrismaClient
  tokenPriceClient: TokenPriceClient
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
    transactionId
  }: {
    userId: string
    questId: QuestId
    requirementId: EventId
    transactionId: string
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
      () =>
        dbClient.notification.create({
          data: {
            userId,
            data: {
              type: 'QuestRequirementCompleted',
              questId,
              requirementId
            }
          }
        }),
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
    relevantEvents
  }: {
    userId: string
    transactionId: string
    relevantEvents: Record<string, EventsItem>
  }) =>
    getXrdPrice(getAmountFromDepositEvent(relevantEvents.XrdDeposited))
      .map(({ xrdUsdValue, xrdAmount }) =>
        operations.push(() =>
          dbClient.audit.create({
            data: {
              transactionId,
              userId,
              type: AuditType.DIRECT_DEPOSIT,
              xrdUsdValue,
              metadata: JSON.stringify({
                resources: getFirstTransactionAuditResources(xrdAmount, userId)
              })
            }
          })
        )
      )
      .map(() => api)

  const helpers = { questRequirementCompleted, addXrdDepositToAuditTable } as const

  const exec = () =>
    ResultAsync.fromPromise(
      dbClient.$transaction(async () => {
        for (const operation of operations) {
          await operation()
        }
      }),
      (error) => error as Error
    )

  const api = { add, exec, helpers }

  return api
}
