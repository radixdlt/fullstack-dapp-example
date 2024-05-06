import { TokenPriceClient } from './../token-price-client'
import { ResultAsync, okAsync, errAsync } from 'neverthrow'
import { EventJob, Job, TransactionQueue } from 'queues'
import { QuestDefinitions, Quests } from 'content'
import type { AppLogger, EventModel, UserModel, UserQuestModel, TransactionModel } from 'common'
import { NotificationApi, NotificationType } from 'common'
import { config } from '../config'
import { EventError, PrismaClient } from 'database'
import { getUserIdFromDepositUserBadgeEvent } from './helpers/getUserIdFromDepositUserBadgeEvent'
import { getDataFromQuestRewardsEvent } from './helpers/getDataFromQuestRewardsEvent'
import { getAmountFromDepositEvent } from './helpers/getAmountFromDepositEvent'
import BigNumber from 'bignumber.js'
import { sumOfXrdRewards } from './helpers/sumOfXrdRewards'
import { databaseTransactions } from './helpers/databaseTransactions'
import { getFirstTransactionAuditResources } from './helpers/getFirstTransactionAuditResources'
import { getAmountFromWithdrawEvent } from './helpers/getAmountFromWithdrawEvent'
import { getUserIdFromWithdrawEvent } from './helpers/getUserIdFromWithdrawEvent'

export type EventWorkerController = ReturnType<typeof EventWorkerController>
export const EventWorkerController = ({
  dbClient,
  notificationApi,
  eventModel,
  userModel,
  userQuestModel,
  tokenPriceClient,
  transactionModel,
  logger,
  transactionQueue
}: {
  dbClient: PrismaClient
  notificationApi: NotificationApi
  eventModel: EventModel
  userModel: UserModel
  transactionModel: TransactionModel
  userQuestModel: UserQuestModel
  tokenPriceClient: TokenPriceClient
  logger: AppLogger
  transactionQueue: TransactionQueue
}) => {
  const handler = (job: Job<EventJob>) => {
    const { traceId, type, transactionId } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      transactionId,
      method: 'eventWorker.handler'
    })

    const db = databaseTransactions({ dbClient, logger: childLogger, transactionId })

    const ensureUserExists = (userId: string, transactionId: string) =>
      userModel(childLogger)
        .getById(userId, {})
        .mapErr(() =>
          eventModel(childLogger).update(transactionId, {
            error: EventError.ERROR_USER_NOT_FOUND
          })
        )

    const ensureValidData = <T>(transactionId: string, data: Partial<T> | undefined) =>
      okAsync(data && Object.values(data).every((d) => d !== undefined)).andThen((isValid) => {
        if (isValid) {
          return okAsync(data as T)
        }

        childLogger.error({
          transactionId,
          message: 'Failed to parse event data',
          data
        })

        return eventModel(childLogger)
          .update(transactionId, {
            error: EventError.ERROR_INVALID_DATA
          })
          .andThen(() => errAsync(''))
      })

    const hasAllRequirements = (questId: keyof Quests, userId: string) => {
      const questDefinition = QuestDefinitions(config.networkId)[questId]
      const requirements = Object.keys(questDefinition.requirements)
      return userQuestModel(childLogger)
        .findCompletedRequirements(userId, questId)
        .map((completedRequirements) => completedRequirements.length === requirements.length)
    }

    const handleRewardDeposited = () =>
      ensureValidData(
        transactionId,
        getDataFromQuestRewardsEvent(job.data.relevantEvents.RewardDepositedEvent)
      ).andThen(({ userId, questId, rewards: resources }) =>
        ensureUserExists(userId, transactionId).andThen(() =>
          tokenPriceClient
            .getXrdPrice()
            .andThen((xrdPrice) =>
              db.rewardsDeposited({
                userId,
                questId,
                xrdUsdValue: xrdPrice.multipliedBy(sumOfXrdRewards(resources)).toNumber(),
                resources
              })
            )
            .andThen(() =>
              notificationApi.send(userId, {
                type: 'QuestRewardsDeposited',
                questId,
                traceId
              })
            )
        )
      )

    const handleRewardClaimed = () =>
      ensureValidData(
        transactionId,
        getDataFromQuestRewardsEvent(job.data.relevantEvents.RewardClaimedEvent)
      ).andThen(({ userId, questId }) =>
        ensureUserExists(userId, transactionId).andThen(() =>
          db.rewardsClaimed({ userId, questId }).andThen(() =>
            notificationApi.send(userId, {
              type: 'QuestRewardsClaimed',
              questId,
              traceId
            })
          )
        )
      )

    const handleUserBadgeDeposited = () => {
      const questId = 'FirstTransactionQuest'
      const userId = getUserIdFromDepositUserBadgeEvent(job.data.relevantEvents.UserBadgeDeposited)
      const xrdAmount = getAmountFromDepositEvent(job.data.relevantEvents.XrdDeposited)

      logger.debug({
        method: 'EventWorkerController.handleUserBadgeDeposited',
        questId,
        userId,
        xrdAmount
      })

      return ensureValidData(transactionId, { userId, xrdAmount })
        .map(({ userId, xrdAmount }) => ({ userId, xrdAmount: BigNumber(xrdAmount) }))
        .andThen(({ userId, xrdAmount }) =>
          ensureUserExists(userId, transactionId)
            .andThen(() => tokenPriceClient.getXrdPrice())
            .andThen((xrdPrice) =>
              db
                .userBadgeDeposited({
                  userId,
                  questId,
                  xrdUsdValue: xrdAmount.multipliedBy(xrdPrice).toNumber(),
                  resources: getFirstTransactionAuditResources(xrdAmount, userId)
                })
                .andThen(() =>
                  ResultAsync.combine([
                    hasAllRequirements(questId, userId).andThen((hasAll) =>
                      hasAll
                        ? transactionModel(childLogger)
                            .add({
                              userId,
                              transactionKey: `${questId}:DepositReward`,
                              attempt: 0
                            })
                            .andThen(() =>
                              transactionQueue.add({
                                type: 'DepositReward',
                                userId,
                                questId,
                                attempt: 0,
                                transactionKey: `${questId}:DepositReward`,
                                traceId
                              })
                            )
                        : okAsync('')
                    ),
                    notificationApi.send(userId, {
                      type: NotificationType.QuestRequirementCompleted,
                      questId: questId,
                      requirementId: 'DepositUserBadge',
                      traceId
                    })
                  ])
                )
            )
        )
    }

    const handleJettyReceivedClams = async () => {
      const questId = 'TransferTokens'
      const userId = await getUserIdFromWithdrawEvent(
        job.data.relevantEvents.WithdrawEvent,
        dbClient
      )

      const amount = getAmountFromWithdrawEvent(
        job.data.relevantEvents.WithdrawEvent,
        config.radQuest.resources.clamAddress
      )

      return ensureValidData(transactionId, { userId })
        .map(({ userId }) => ({ userId }))
        .andThen(({ userId }) =>
          ensureUserExists(userId, transactionId).andThen(({ id }) =>
            db
              .jettyReceivedClams({
                userId: id,
                amount: parseInt(amount)
              })
              .andThen(() =>
                ResultAsync.combine([
                  hasAllRequirements(questId, userId).andThen((hasAll) =>
                    hasAll
                      ? transactionModel(childLogger)
                          .add({
                            userId,
                            transactionKey: `${questId}:DepositReward`,
                            attempt: 0
                          })
                          .andThen(() =>
                            transactionQueue.add({
                              type: 'DepositReward',
                              userId,
                              questId,
                              attempt: 0,
                              transactionKey: `${questId}:DepositReward`,
                              traceId
                            })
                          )
                      : okAsync('')
                  ),
                  notificationApi.send(userId, {
                    type: NotificationType.QuestRequirementCompleted,
                    questId: questId,
                    requirementId: 'JettyReceivedClams',
                    traceId
                  })
                ])
              )
          )
        )
    }

    switch (type) {
      case 'QuestRewardDeposited':
        return handleRewardDeposited()
      case 'QuestRewardClaimed':
        return handleRewardClaimed()
      case 'UserBadge':
        return handleUserBadgeDeposited()
      case 'JettyReceivedClams':
        return handleJettyReceivedClams()

      default:
        childLogger.error({
          message: 'Unhandled Event'
        })
        return eventModel(childLogger).update(transactionId, {
          error: EventError.ERROR_UNHANDLED_EVENT
        })
    }
  }

  return { handler }
}
