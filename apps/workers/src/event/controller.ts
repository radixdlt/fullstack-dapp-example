import { TokenPriceClient } from './../token-price-client'
import { ResultAsync, okAsync, errAsync, err, ok } from 'neverthrow'
import { EventJob, Job, TransactionQueue } from 'queues'
import { EventId, QuestDefinitions, QuestId, Quests } from 'content'
import {
  AppLogger,
  EventModel,
  UserModel,
  UserQuestModel,
  TransactionModel,
  AccountAddressModel
} from 'common'
import { NotificationApi, NotificationType } from 'common'
import { config } from '../config'
import { AuditType, EventError, PrismaClient } from 'database'
import { getUserIdFromDepositUserBadgeEvent } from './helpers/getUserIdFromDepositUserBadgeEvent'
import { getDataFromQuestRewardsEvent } from './helpers/getDataFromQuestRewardsEvent'
import { getAmountFromDepositEvent } from './helpers/getAmountFromDepositEvent'
import BigNumber from 'bignumber.js'
import { sumOfXrdRewards } from './helpers/sumOfXrdRewards'
import { databaseTransactions } from './helpers/databaseTransactions'
import { getFirstTransactionAuditResources } from './helpers/getFirstTransactionAuditResources'
import { getUserIdFromWithdrawEvent } from './helpers/getUserIdFromWithdrawEvent'
import { getBadgeAddressAndIdFromCombineElementsDepositedEvent } from './helpers/getBadgeAddressAndIdFromCombineElementsDepositedEvent'
import { randomUUID } from 'crypto'
import { DbTransactionBuilder } from './helpers/dbTransactionBuilder'

const transformUserIdIntoBadgeId = (userId: string) => ({
  badgeId: `<${userId}>`,
  badgeResourceAddress: config.radQuest.badges.userBadgeAddress
})

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
  transactionQueue,
  accountAddressModel
}: {
  dbClient: PrismaClient
  notificationApi: NotificationApi
  eventModel: EventModel
  userModel: UserModel
  transactionModel: TransactionModel
  accountAddressModel: AccountAddressModel
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

    const dbTransactions = databaseTransactions({ dbClient, logger: childLogger, transactionId })

    const ensureUserExists = (
      userId: string,
      transactionId: string
    ): ResultAsync<string, { reason: string }> =>
      userModel(childLogger)
        .getById(userId, {})
        .mapErr(() => {
          eventModel(childLogger).update(transactionId, {
            error: EventError.ERROR_USER_NOT_FOUND
          })
          return { reason: EventError.ERROR_USER_NOT_FOUND }
        })
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

        return eventModel(childLogger)
          .update(transactionId, {
            error: EventError.ERROR_INVALID_DATA
          })
          .andThen(() => errAsync(''))
      })

    const hasAllRequirementsCompleted = (questId: keyof Quests, userId: string) => {
      const questDefinition = QuestDefinitions()[questId]
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
              dbTransactions.rewardsDeposited({
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
          dbTransactions.rewardsClaimed({ userId, questId }).andThen(() =>
            notificationApi.send(userId, {
              type: 'QuestRewardsClaimed',
              questId,
              traceId
            })
          )
        )
      )

    const handleAllQuestRequirementCompleted = ({
      questId,
      requirementId,
      userId
    }: {
      questId: QuestId
      requirementId: EventId
      userId: string
    }) => {
      const { badgeId, badgeResourceAddress } = transformUserIdIntoBadgeId(userId)
      return ResultAsync.combine([
        hasAllRequirementsCompleted(questId, userId).andThen((hasAll) =>
          hasAll
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
            : okAsync('')
        ),
        notificationApi.send(userId, {
          type: NotificationType.QuestRequirementCompleted,
          questId,
          requirementId,
          traceId
        })
      ]).map(() => {
        childLogger.debug({
          method: `EventWorkerController.handleAllQuestRequirementCompleted.success`,
          questId,
          requirementId,
          userId
        })
      })
    }

    const handelCombineElementsDepositedEvent = async () => {
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

    switch (type) {
      case 'QuestRewardDeposited':
        return handleRewardDeposited()
      case 'QuestRewardClaimed':
        return handleRewardClaimed()
      case 'CombineElementsDeposited':
        return handelCombineElementsDepositedEvent()
      case 'UserBadge':
        return getUserIdFromDepositUserBadgeEvent(job.data.relevantEvents.UserBadgeDeposited)
          .asyncAndThen((userId) => ensureUserExists(userId, transactionId))
          .map((userId) => ({
            questId: 'FirstTransactionQuest' as QuestId,
            requirementId: 'DepositUserBadge' as EventId,
            userId,
            transactionId
          }))
          .andThen((questValues) =>
            DbTransactionBuilder(dbClient)
              .helpers.questRequirementCompleted(questValues)
              .helpers.addXrdDepositToAuditTable({
                ...questValues,
                tokenPriceClient,
                relevantEvents: job.data.relevantEvents
              })
              .andThen((builder) => builder.exec())
              .andThen(() => handleAllQuestRequirementCompleted(questValues))
          )

      case 'JettyReceivedClams': {
        return getUserIdFromWithdrawEvent(job.data.relevantEvents.WithdrawEvent, dbClient)
          .map((userId) => ({
            questId: 'TransferTokens' as QuestId,
            requirementId: 'JettyReceivedClams' as EventId,
            userId,
            transactionId
          }))
          .andThen((questValues) =>
            DbTransactionBuilder(dbClient)
              .helpers.questRequirementCompleted(questValues)
              .exec()
              .andThen(() => handleAllQuestRequirementCompleted(questValues))
          )
      }
      case 'XrdStaked': {
        const maybeAccountAddress: string | undefined = (
          job.data.relevantEvents['WithdrawEvent'].emitter as any
        ).entity.entity_address

        const accountAddressResult = maybeAccountAddress
          ? ok(maybeAccountAddress)
          : err({ reason: 'AccountAddressNotFound' })

        return accountAddressResult.asyncAndThen((accountAddress) =>
          accountAddressModel
            .getTrackedAddressUserId(accountAddress, 'StakingQuest')
            .andThen((userId) => (userId ? ok(userId) : err({ reason: 'UserIdNotFound' })))
            .map((userId) => ({
              questId: 'StakingQuest' as QuestId,
              requirementId: 'XrdStaked' as EventId,
              userId,
              transactionId
            }))
            .andThen((questValues) =>
              DbTransactionBuilder(dbClient)
                .helpers.questRequirementCompleted(questValues)
                .exec()
                .andThen(() => handleAllQuestRequirementCompleted(questValues))
            )
            .andThen(() => accountAddressModel.deleteTrackedAddress(accountAddress, 'StakingQuest'))
        )
      }
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
