import { TokenPriceClient } from './../token-price-client'
import { ResultAsync, okAsync, errAsync, err, ok, Result } from 'neverthrow'
import { EventJob, Job, TransactionQueue } from 'queues'
import { QuestDefinitions, QuestId, Quests } from 'content'
import { ConfigModel, EventId, Message, getAccountFromMayaRouterWithdrawEvent } from 'common'
import {
  AppLogger,
  EventModel,
  UserModel,
  UserQuestModel,
  TransactionModel,
  AccountAddressModel
} from 'common'
import { MessageApi } from 'common'
import { config } from '../config'
import { PrismaClient } from 'database'
import {
  getAccountAddressFromAccountAddedEvent,
  getUserIdFromDepositHeroBadgeEvent
} from './helpers/getUserIdFromDepositHeroBadgeEvent'
import { getDataFromQuestRewardsEvent } from './helpers/getDataFromQuestRewardsEvent'
import { databaseTransactions } from './helpers/databaseTransactions'
import { getUserIdFromWithdrawEvent } from './helpers/getUserIdFromWithdrawEvent'
import { getBadgeAddressAndIdFromCombineElementsDepositedEvent } from './helpers/getBadgeAddressAndIdFromCombineElementsDepositedEvent'
import { randomUUID } from 'crypto'
import { DbTransactionBuilder } from '../helpers/dbTransactionBuilder'
import { getDetailsFromCombineElementsMintedRadgemEvent } from './helpers/getDetailsFromCombineElementsMintedRadgemEvent'
import { getAmountFromDepositEvent } from './helpers/getAmountFromDepositEvent'

const transformUserIdIntoBadgeId = (userId: string) => ({
  badgeId: `<${userId}>`,
  badgeResourceAddress: config.radQuest.badges.heroBadgeAddress
})

type EventEmitter = {
  entity: {
    entity_address: string
    entity_type: string
    is_global: boolean
  }
  type: string
  object_module_id: string
}

export type EventWorkerController = ReturnType<typeof EventWorkerController>
export const EventWorkerController = ({
  dbClient,
  messageApi,
  eventModel,
  userModel,
  userQuestModel,
  tokenPriceClient,
  transactionModel,
  logger,
  transactionQueue,
  accountAddressModel,
  configModel
}: {
  dbClient: PrismaClient
  messageApi: MessageApi
  eventModel: EventModel
  userModel: UserModel
  transactionModel: TransactionModel
  accountAddressModel: AccountAddressModel
  userQuestModel: UserQuestModel
  tokenPriceClient: TokenPriceClient
  logger: AppLogger
  transactionQueue: TransactionQueue
  configModel: ConfigModel
}) => {
  const handler = (job: Job<EventJob>) => {
    const { traceId, type, transactionId } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      transactionId,
      method: 'eventWorker.handler'
    })

    const dbTransactions = databaseTransactions({ dbClient, logger: childLogger, transactionId })
    const dbTransactionBuilder = DbTransactionBuilder({ dbClient, tokenPriceClient, messageApi })

    const ensureUserExists = (
      userId: string,
      transactionId: string
    ): ResultAsync<string, { reason: string }> =>
      userModel(childLogger)
        .getById(userId, {})
        .andThen((user) => (user ? okAsync(user) : errAsync({ reason: 'UserNotFound' })))
        .mapErr(() => ({ reason: 'UserNotFound' }))
        .map((user) => user.id)

    const ensureValidData = <T, U = T>(transactionId: string, data: Partial<T> | undefined) =>
      okAsync(data && Object.values(data).every((d) => d !== undefined)).andThen((isValid) => {
        if (isValid) {
          return okAsync(data as U)
        }

        childLogger.error({
          transactionId,
          message: 'Failed to parse event data',
          data
        })

        return errAsync({ reason: 'InvalidData' })
      })

    const hasAllRequirementsCompleted = (questId: keyof Quests, userId: string) => {
      const questDefinition = QuestDefinitions()[questId]
      const requirements = Object.keys(questDefinition.requirements)
      return userQuestModel(childLogger)
        .findCompletedRequirements(userId, questId)
        .map((completedRequirements) => ({
          isAllCompleted: completedRequirements.length === requirements.length,
          completedRequirements
        }))
    }

    const handleRewardDeposited = () =>
      ensureValidData(
        transactionId,
        getDataFromQuestRewardsEvent(job.data.relevantEvents.RewardDepositedEvent)
      ).andThen(({ userId, questId }) =>
        ensureUserExists(userId, transactionId).andThen(() =>
          dbTransactions
            .rewardsDeposited({
              userId,
              questId
            })
            .andThen(([_, message]) =>
              messageApi.send(
                userId,
                {
                  type: 'QuestRewardsDeposited',
                  questId,
                  traceId
                },
                message.id
              )
            )
        )
      )

    const handleRewardClaimed = () =>
      ensureValidData(
        transactionId,
        getDataFromQuestRewardsEvent(job.data.relevantEvents.RewardClaimedEvent)
      ).andThen(({ userId, questId }) =>
        ensureUserExists(userId, transactionId).andThen(() =>
          dbTransactions.rewardsClaimed({ userId, questId }).andThen(([_, __, message]) =>
            messageApi.send(
              userId,
              {
                type: 'QuestRewardsClaimed',
                questId,
                traceId
              },
              message.id
            )
          )
        )
      )

    const handleAllQuestRequirementCompleted = ({
      questId,
      userId
    }: {
      questId: QuestId
      userId: string
    }) => {
      const { badgeId, badgeResourceAddress } = transformUserIdIntoBadgeId(userId)

      return hasAllRequirementsCompleted(questId, userId)
        .andThen((value) =>
          value.isAllCompleted
            ? transactionModel(childLogger)
                .add({
                  badgeId,
                  badgeResourceAddress,
                  transactionKey: `${questId}:DepositReward`,
                  attempt: 0
                })
                .andThen(() =>
                  transactionQueue.add({
                    type: 'DepositReward',
                    badgeId,
                    badgeResourceAddress,
                    questId,
                    attempt: 0,
                    transactionKey: `${questId}:DepositReward`,
                    traceId
                  })
                )
                .map(() => {
                  ResultAsync.fromPromise(
                    dbClient.message.create({
                      data: {
                        userId,
                        data: {
                          type: 'QuestRequirementsCompleted',
                          questId
                        }
                      }
                    }),
                    (error) => {
                      logger.error({
                        error,
                        method: 'databaseTransactions.questRequirementsCompleted.error'
                      })
                      return {
                        error,
                        message: 'failed to set quest requirements completed'
                      }
                    }
                  ).andThen((message) =>
                    messageApi.send(
                      userId,
                      {
                        type: 'QuestRequirementsCompleted',
                        questId,
                        traceId
                      },
                      message.id
                    )
                  )
                  return value
                })
            : okAsync(value)
        )
        .map((value) => {
          childLogger.debug({
            method: `EventWorkerController.handleAllQuestRequirementCompleted.success`,
            questId,
            userId,
            hasCompletedAllQuestRequirements: value.isAllCompleted
          })

          return value
        })
    }

    const handelCombineElementsDepositedEvent = () => {
      const {
        badgeResourceAddress,
        badgeId
      }: {
        badgeResourceAddress?: string
        badgeId?: string
      } = getBadgeAddressAndIdFromCombineElementsDepositedEvent(
        job.data.relevantEvents.DepositedEvent
      )

      if (!badgeId || !badgeResourceAddress) {
        return errAsync('Invalid badge data')
      }

      return ensureValidData(transactionId, { localId: badgeId }).andThen(() => {
        const transactionKey = `CombinedElementsMintRadgem:${randomUUID()}`
        return transactionModel(childLogger)
          .add({
            badgeResourceAddress,
            badgeId,
            transactionKey,
            attempt: 0
          })
          .andThen(() => {
            return transactionQueue.add({
              type: 'CombinedElementsMintRadgem',
              badgeResourceAddress,
              badgeId,
              attempt: 0,
              transactionKey,
              traceId
            })
          })
      })
    }

    const handelCombineElementsMintedRadgemEvent = () => {
      const {
        badgeResourceAddress,
        badgeId,
        radgemId
      }: {
        badgeResourceAddress?: string
        badgeId?: string
        radgemId?: string
      } = getDetailsFromCombineElementsMintedRadgemEvent(job.data.relevantEvents.MintedRadgemEvent)

      if (!badgeId || !badgeResourceAddress) {
        return errAsync('Invalid badge data')
      }
      if (!radgemId) {
        return errAsync('Invalid radgem data')
      }

      return ensureValidData(transactionId, { localId: badgeId }).andThen(() => {
        const transactionKey = `CombinedElementsAddRadgemImage:${randomUUID()}`
        return transactionModel(childLogger)
          .add({
            badgeResourceAddress,
            badgeId,
            transactionKey,
            attempt: 0,
            metadata: JSON.stringify({ nonFungibleId: radgemId })
          })
          .andThen(() => {
            return transactionQueue.add({
              type: 'CombinedElementsAddRadgemImage',
              badgeResourceAddress,
              badgeId,
              attempt: 0,
              transactionKey,
              traceId,
              radgemId
            })
          })
          .andThen(() => {
            return ResultAsync.fromPromise(
              dbClient.message.create({
                data: {
                  userId: badgeId,
                  data: {
                    type: 'CombineElementsMintRadgem',
                    traceId
                  }
                }
              }),
              (error) => {
                logger.error({
                  error,
                  method: 'databaseTransactions.CombineElementsMintRadgem.error'
                })
                return {
                  error,
                  message: 'failed to set combined elements minted'
                }
              }
            ).andThen((message) =>
              messageApi.send(
                badgeId,
                {
                  type: 'CombineElementsMintRadgem',
                  traceId
                },
                message.id
              )
            )
          })
      })
    }

    const sendMessage = (userId: string, message: Message) =>
      ResultAsync.fromPromise(
        dbClient.message.create({
          data: {
            userId,
            data: JSON.stringify(message)
          }
        }),
        (error) => ({ reason: 'FailedToCreateMessageInDb', jsError: error as Error })
      ).andThen(({ id }) => messageApi.send(userId, message, id).orElse(() => ok(undefined)))

    const handleQuestWithTrackedAccount = (
      maybeAccountAddress: string | undefined,
      questId: QuestId,
      shouldRemoveTrackedAccountAddressFn: (value: {
        isAllCompleted: boolean
        completedRequirements: {
          questId: string
          userId: string
          requirementId: string
          createdAt: Date
        }[]
      }) => boolean = () => true
    ) => {
      const accountAddressResult = maybeAccountAddress
        ? ok(maybeAccountAddress)
        : err({ reason: 'AccountAddressNotFound' })

      return accountAddressResult.asyncAndThen((accountAddress) =>
        accountAddressModel
          .getTrackedAddressUserId(accountAddress, questId)
          .andThen((userId) => (userId ? ok(userId) : err({ reason: 'UserIdNotFound' })))
          .map((userId) => ({
            questId,
            requirementId: type,
            userId,
            transactionId,
            traceId
          }))
          .andThen((questValues) =>
            dbTransactionBuilder.helpers
              .questRequirementCompleted(questValues)
              .exec()
              .andThen(() => handleAllQuestRequirementCompleted(questValues))
          )
          .andThen((value) =>
            shouldRemoveTrackedAccountAddressFn(value)
              ? accountAddressModel.deleteTrackedAddress(accountAddress, questId)
              : okAsync(undefined)
          )
      )
    }

    switch (type) {
      case EventId.QuestRewardDeposited:
        return handleRewardDeposited()
      case EventId.QuestRewardClaimed:
        return handleRewardClaimed()
      case EventId.CombineElementsDeposited:
        return configModel(logger)
          .isRadGemMintingEnabled()
          .andThen((isEnabled) =>
            isEnabled
              ? handelCombineElementsDepositedEvent()
              : errAsync({ reason: 'RadGemMintingDisabled' })
          )
      case EventId.CombineElementsMintedRadgem:
        return configModel(logger)
          .isRadGemMintingEnabled()
          .andThen((isEnabled) =>
            isEnabled
              ? handelCombineElementsMintedRadgemEvent()
              : errAsync({ reason: 'RadGemMintingDisabled' })
          )

      case EventId.CombineElementsAddedRadgemImage:
        return configModel(logger)
          .isRadGemMintingEnabled()
          .andThen((isEnabled) =>
            isEnabled ? okAsync(undefined) : errAsync({ reason: 'RadGemMintingDisabled' })
          )

      case EventId.DepositHeroBadge:
        return getUserIdFromDepositHeroBadgeEvent(
          job.data.relevantEvents.HeroBadgeDeposited
        ).asyncAndThen((userId) =>
          ensureUserExists(userId, transactionId)
            .map((userId) => ({
              questId: 'FirstTransactionQuest' as QuestId,
              requirementId: type,
              userId,
              transactionId,
              traceId
            }))
            .andThen((questValues) =>
              dbTransactionBuilder.helpers
                .questRequirementCompleted(questValues)
                .exec()
                .andThen(() => handleAllQuestRequirementCompleted(questValues))
            )
        )

      case EventId.AccountAllowedToForgeHeroBadge:
        return getAccountAddressFromAccountAddedEvent(
          job.data.relevantEvents.AccountAddedEvent
        ).asyncAndThen((accountAddress) =>
          userModel(childLogger)
            .getByAccountAddress(accountAddress, {})
            .andThen((user) => (user ? ok(user) : err({ reason: 'UserNotFound' })))
            .andThen((user) =>
              sendMessage(user.id, {
                type: 'HeroBadgeReadyToBeClaimed',
                traceId: job.data.traceId
              })
            )
        )

      case EventId.JettyReceivedClams: {
        return getUserIdFromWithdrawEvent(job.data.relevantEvents.WithdrawEvent, dbClient)
          .map((userId) => ({
            questId: 'TransferTokens' as QuestId,
            requirementId: type,
            userId,
            transactionId,
            traceId
          }))
          .andThen((questValues) =>
            dbTransactionBuilder.helpers
              .questRequirementCompleted(questValues)
              .exec()
              .andThen(() => handleAllQuestRequirementCompleted(questValues))
          )
      }
      case EventId.MayaRouterWithdrawEvent: {
        const maybeAccountAddress = getAccountFromMayaRouterWithdrawEvent(
          job.data.relevantEvents.MayaRouterWithdrawEvent
        )

        return handleQuestWithTrackedAccount(maybeAccountAddress, 'MayaQuest')
      }
      case EventId.InstapassBadgeDeposited: {
        const maybeAccountAddress = (
          job.data.relevantEvents['DepositedEvent'].emitter as EventEmitter
        ).entity.entity_address

        return handleQuestWithTrackedAccount(maybeAccountAddress, 'InstapassQuest')
      }

      case EventId.XrdStaked: {
        const maybeAccountAddress: string | undefined = (
          job.data.relevantEvents['WithdrawEvent'].emitter as any
        ).entity.entity_address

        return handleQuestWithTrackedAccount(maybeAccountAddress, 'StakingQuest')
      }

      case EventId.JettySwap:
      case EventId.LettySwap: {
        const maybeAccountAddress: string | undefined = (
          job.data.relevantEvents['WithdrawEvent'].emitter as any
        ).entity.entity_address

        return handleQuestWithTrackedAccount(
          maybeAccountAddress,
          'SwapQuest',
          ({ completedRequirements }) =>
            completedRequirements.filter(({ requirementId }) =>
              ([EventId.JettySwap, EventId.LettySwap] as string[]).includes(requirementId)
            ).length === 2
        )
      }

      default:
        childLogger.error({
          message: 'Unhandled Event'
        })
        return errAsync({ reason: 'UnhandledEvent' })
    }
  }

  return { handler }
}
