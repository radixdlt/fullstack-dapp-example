import { TokenPriceClient } from './../token-price-client'
import { okAsync, errAsync, err, ok, ResultAsync } from 'neverthrow'
import { EventJob, Job, TransactionQueue } from 'queues'
import { QuestDefinitions, QuestId, Quests } from 'content'
import {
  ConfigModel,
  EventId,
  MessageType,
  ReferralQuestConfig,
  UserByReferralCode,
  getAccountFromMayaRouterWithdrawEvent
} from 'common'
import {
  AppLogger,
  EventModel,
  UserModel,
  UserQuestModel,
  TransactionModel,
  AccountAddressModel
} from 'common'
import { CompletedQuestRequirement, PrismaClient, QuestProgress, User } from 'database'
import {
  getAccountAddressFromAccountAddedEvent,
  getUserIdFromDepositHeroBadgeEvent
} from './helpers/getUserIdFromDepositHeroBadgeEvent'
import { getDataFromQuestRewardsEvent } from './helpers/getDataFromQuestRewardsEvent'
import { databaseTransactions } from './helpers/databaseTransactions'
import { getUserIdFromWithdrawEvent } from './helpers/getUserIdFromWithdrawEvent'
import { getUserIdFromCombineElementsDepositedEvent } from './helpers/getUserIdFromCombineElementsDepositedEvent'
import { DbTransactionBuilder } from '../helpers/dbTransactionBuilder'
import { getDetailsFromCombineElementsMintedRadgemEvent } from './helpers/getDetailsFromCombineElementsMintedRadgemEvent'
import { WorkerError } from '../_types'
import { getUserById } from '../helpers/getUserById'
import { SendMessage } from '../helpers/sendMessage'
import { getUserIdFromRadgemImageEvent } from './helpers/getUserIdFromRadgemImageEvent'
import { config } from '../config'

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
      ).andThen(({ userId, questId, xrdAmount }) =>
        getUserById(userId, dbClient).andThen(() =>
          dbTransactions
            .rewardsDeposited({
              userId,
              questId,
              xrdAmount
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

    const sendReferralXrdReward = (userId: string, questId: string, refereeUserId: string) =>
      transactionModel(logger).add({
        discriminator: `${questId}:DepositXrdReward:${refereeUserId}`,
        userId,
        type: 'DepositXrdReward',
        questId,
        traceId,
        amount: config.referralRewardXrdAmount
      })

    const prepareDataStructures = (
      referrer: User & {
        referredUsers: User[]
        completedQuestRequirements: CompletedQuestRequirement[]
        questProgress: QuestProgress[]
      }
    ) => {
      const currentReferralsAmount = referrer.referredUsers.length
      const userId = referrer.id
      const requirements = QuestDefinitions()['ReferralQuest'].requirements
      const tiersRequirements = referrer.completedQuestRequirements
        .filter((req) => req.questId === 'ReferralQuest')
        .reduce(
          (acc, requirement) => {
            acc[requirement.requirementId] = true
            return acc
          },
          {} as Record<string, boolean>
        )
      return okAsync({
        currentReferralsAmount,
        userId,
        requirements,
        tiersRequirements
      })
    }

    const handleTiersRewards = (data: {
      currentReferralsAmount: number
      userId: string
      requirements: Record<string, any>
      tiersRequirements: Record<string, boolean>
    }) => {
      const { currentReferralsAmount, userId, requirements, tiersRequirements } = data

      const singleTierHandler = (tier: string, nextTier?: string) => {
        return userQuestModel(logger)
          .addCompletedRequirement('ReferralQuest', userId, tier)
          .andThen(() =>
            nextTier
              ? userQuestModel(logger).updateQuestStatus(
                  `ReferralQuest:${nextTier}`,
                  userId,
                  'IN_PROGRESS'
                )
              : okAsync(undefined)
          )
          .andThen(() =>
            transactionModel(logger).add({
              userId,
              discriminator: `ReferralQuest:${tier}:${userId}`,
              type: 'DepositPartialReward',
              requirement: tier,
              traceId,
              questId: 'ReferralQuest'
            })
          )
      }

      if (
        currentReferralsAmount === requirements.BronzeLevel.threshold &&
        !tiersRequirements.BronzeLevel
      ) {
        return singleTierHandler('BronzeLevel', 'SilverLevel')
      }

      if (
        currentReferralsAmount === requirements.SilverLevel.threshold &&
        !tiersRequirements.SilverLevel
      ) {
        return singleTierHandler('SilverLevel', 'GoldLevel')
      }

      if (
        currentReferralsAmount === requirements.GoldLevel.threshold &&
        !tiersRequirements.GoldLevel
      ) {
        return singleTierHandler('GoldLevel')
      }

      return okAsync(undefined)
    }

    const ensureQuestProgress = (referrer: UserByReferralCode) => {
      return userQuestModel(logger)
        .getQuestStatus(referrer.id, 'ReferralQuest:BronzeLevel')
        .andThen((progress) =>
          progress
            ? okAsync(referrer)
            : userQuestModel(logger)
                .updateQuestStatus('ReferralQuest:BronzeLevel', referrer.id, 'IN_PROGRESS')
                .map(() => referrer)
        )
    }

    const handleReferrerRewards = ({ referredBy, id }: User, questId: string) => {
      const isUserReferred = referredBy !== null

      if (!isUserReferred || questId !== ReferralQuestConfig.triggerRewardAfterQuest) {
        return okAsync(undefined)
      }

      return userModel(childLogger)
        .getByReferralCode(referredBy)
        .andThen((referrer) => ensureQuestProgress(referrer))
        .andThen((referrer) => prepareDataStructures(referrer))
        .andThen((data) =>
          ResultAsync.combineWithAllErrors([
            handleTiersRewards(data),
            sendReferralXrdReward(data.userId, 'ReferralQuest', id)
          ])
            .mapErr((errors) => ({
              reason: WorkerError.FailedToSendReferralRewards,
              jsError: errors
            }))
            .andThen(() =>
              sendMessage(data.userId, { type: MessageType.ReferralCompletedBasicQuests, traceId })
            )
        )
    }

    const handleRewardClaimed = () =>
      ensureValidData(
        transactionId,
        getDataFromQuestRewardsEvent(job.data.relevantEvents.RewardClaimedEvent)
      ).andThen(({ userId, questId, xrdAmount }) =>
        getUserById(userId, dbClient).andThen((user) =>
          dbTransactions
            .rewardsClaimed({ userId, questId, xrdAmount })
            .andThen(() =>
              sendMessage(userId, {
                type: 'QuestRewardsClaimed',
                questId,
                traceId
              })
            )
            .andThen(() => handleReferrerRewards(user, questId))
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
      const userId = getUserIdFromCombineElementsDepositedEvent(
        job.data.relevantEvents.DepositedEvent
      )

      return getUserById(userId!, dbClient).andThen(() =>
        transactionModel(childLogger).add({
          discriminator: `CombinedElementsMintRadgem:${traceId}`,
          userId,
          type: 'CombinedElementsMintRadgem',
          traceId
        })
      )
    }

    const handelCombineElementsMintedRadgemEvent = () => {
      const { userId, radgemId } = getDetailsFromCombineElementsMintedRadgemEvent(
        job.data.relevantEvents.MintedRadgemEvent
      )

      return getUserById(userId, dbClient).andThen(() =>
        transactionModel(childLogger)
          .add({
            discriminator: `CombinedElementsAddRadgemImage:${radgemId}`,
            userId: userId!,
            type: 'CombinedElementsAddRadgemImage',
            radgemId: radgemId!,
            traceId
          })
          .andThen(() => sendMessage(userId!, { type: 'CombineElementsMintRadgem', traceId }))
      )
    }

    const handleAddedRadgemImage = () => {
      const userId = getUserIdFromRadgemImageEvent(job.data.relevantEvents.AddedRadgemImageEvent)
        .split('<')[1]
        .split('>')[0]

      return getUserById(userId, dbClient).andThen(() =>
        sendMessage(userId, { type: 'CombineElementsAddRadgemImage', traceId })
      )
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
        return handleAddedRadgemImage()
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
              .andThen(() =>
                sendMessage(questValues.userId, {
                  type: 'QuestRequirementCompleted',
                  questId: questValues.questId,
                  requirementId: questValues.requirementId,
                  traceId
                })
              )
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
