import { TokenPriceClient } from './../token-price-client'
import { okAsync, errAsync, err, ok } from 'neverthrow'
import { EventJob, Job, TransactionQueue } from 'queues'
import { QuestDefinitions, QuestId, Quests } from 'content'
import { ConfigModel, EventId, getAccountFromMayaRouterWithdrawEvent } from 'common'
import {
  AppLogger,
  EventModel,
  UserModel,
  UserQuestModel,
  TransactionModel,
  AccountAddressModel
} from 'common'
import { PrismaClient } from 'database'
import {
  getAccountAddressFromAccountAddedEvent,
  getUserIdFromDepositHeroBadgeEvent
} from './helpers/getUserIdFromDepositHeroBadgeEvent'
import { getDataFromQuestRewardsEvent } from './helpers/getDataFromQuestRewardsEvent'
import { databaseTransactions } from './helpers/databaseTransactions'
import { getUserIdFromWithdrawEvent } from './helpers/getUserIdFromWithdrawEvent'
import { getBadgeAddressAndIdFromCombineElementsDepositedEvent } from './helpers/getBadgeAddressAndIdFromCombineElementsDepositedEvent'
import { DbTransactionBuilder } from '../helpers/dbTransactionBuilder'
import { getDetailsFromCombineElementsMintedRadgemEvent } from './helpers/getDetailsFromCombineElementsMintedRadgemEvent'
import { WorkerError } from '../_types'
import { getUserById } from '../helpers/getUserById'
import { SendMessage } from '../helpers/sendMessage'

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
  userModel,
  userQuestModel,
  tokenPriceClient,
  transactionModel,
  logger,
  AccountAddressModel,
  sendMessage
}: {
  dbClient: PrismaClient
  eventModel: EventModel
  userModel: UserModel
  transactionModel: TransactionModel
  AccountAddressModel: AccountAddressModel
  userQuestModel: UserQuestModel
  tokenPriceClient: TokenPriceClient
  logger: AppLogger
  transactionQueue: TransactionQueue
  configModel: ConfigModel
  sendMessage: SendMessage
}) => {
  const handler = (job: Job<EventJob>) => {
    const { traceId, type, transactionId } = job.data

    const childLogger = logger.child({
      traceId,
      type,
      transactionId,
      method: 'eventWorker.handler'
    })

    const accountAddressModel = AccountAddressModel(childLogger)

    const dbTransactions = databaseTransactions({ dbClient, logger: childLogger, transactionId })
    const dbTransactionBuilder = DbTransactionBuilder({ dbClient, tokenPriceClient })

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
        getUserById(userId, dbClient).andThen(() =>
          dbTransactions
            .rewardsDeposited({
              userId,
              questId
            })
            .andThen(() =>
              sendMessage(userId, {
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
        getUserById(userId, dbClient).andThen(() =>
          dbTransactions.rewardsClaimed({ userId, questId }).andThen(() =>
            sendMessage(userId, {
              type: 'QuestRewardsClaimed',
              questId,
              traceId
            })
          )
        )
      )

    const handleAllQuestRequirementCompleted = ({
      questId,
      userId
    }: {
      questId: QuestId
      userId: string
    }) =>
      hasAllRequirementsCompleted(questId, userId).andThen((value) =>
        value.isAllCompleted
          ? transactionModel(childLogger)
              .add({
                userId,
                discriminator: `${questId}:DepositReward:${userId}`,
                type: 'DepositReward',
                traceId,
                questId
              })
              .andThen(() =>
                sendMessage(userId, { type: 'QuestRequirementsCompleted', questId, traceId })
              )
              .map(() => value)
          : okAsync(value)
      )

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
        return transactionModel(childLogger).add({
          discriminator: `CombinedElementsMintRadgem:${traceId}`,
          userId: badgeId.slice(1, -1),
          type: 'CombinedElementsMintRadgem',
          traceId
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

      const userId = badgeId.slice(1, -1)

      return ensureValidData(transactionId, { localId: badgeId }).andThen(() => {
        return transactionModel(childLogger)
          .add({
            discriminator: `CombinedElementsAddRadgemImage:${radgemId}`,
            userId,
            type: 'CombinedElementsAddRadgemImage',
            radgemId,
            traceId
          })
          .andThen(() => sendMessage(userId, { type: 'CombineElementsMintRadgem', traceId }))
      })
    }

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
              .andThen(() =>
                sendMessage(questValues.userId, {
                  type: 'QuestRequirementCompleted',
                  requirementId: questValues.requirementId,
                  questId,
                  traceId
                })
              )
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
        return handelCombineElementsDepositedEvent()
      case EventId.CombineElementsMintedRadgem:
        return handelCombineElementsMintedRadgemEvent()
      case EventId.CombineElementsAddedRadgemImage:
        return okAsync(undefined)
      case EventId.DepositHeroBadge:
        return getUserIdFromDepositHeroBadgeEvent(
          job.data.relevantEvents.HeroBadgeDeposited
        ).asyncAndThen((userId) =>
          getUserById(userId, dbClient)
            .map(() => ({
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
            .andThen((user) => (user ? ok(user) : err({ reason: WorkerError.UserNotFound })))
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
