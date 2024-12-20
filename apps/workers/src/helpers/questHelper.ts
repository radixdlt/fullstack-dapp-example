import {
  AccountAddressModel,
  AppLogger,
  EventId,
  WorkerError,
  TransactionIntentHelper
} from 'common'
import { QuestDefinitions, QuestId, Quests } from 'content'
import { PrismaClient, QuestStatus } from 'database'
import { ResultAsync, okAsync } from 'neverthrow'
import { MessageHelper } from './messageHelper'
import { WorkerOutputError } from '../_types'

export type QuestHelper = ReturnType<typeof QuestHelper>
export const QuestHelper = ({
  transactionIntentHelper,
  userId,
  traceId,
  sendMessage,
  dbClient,
  logger,
  accountAddressModel,
  accountAddress,
  transactionId,
  priority
}: {
  transactionIntentHelper: TransactionIntentHelper
  userId: string
  traceId: string
  sendMessage: MessageHelper
  dbClient: PrismaClient
  logger?: AppLogger
  accountAddressModel: ReturnType<AccountAddressModel>
  accountAddress: string
  transactionId: string
  priority: number
}) => {
  const getCompletedQuestRequirements = (
    userId: string,
    questId: QuestId,
    dbClient: PrismaClient
  ) =>
    ResultAsync.fromPromise(
      dbClient.completedQuestRequirement.findMany({
        where: {
          userId,
          questId
        }
      }),
      (error) => ({ reason: WorkerError.FailedToFindCompletedRequirements, jsError: error })
    )

  const hasCompletedAllQuestRequirements = (questId: keyof Quests, userId: string) => {
    const questDefinition = QuestDefinitions()[questId]
    const requirements = Object.keys(questDefinition.requirements)

    return getCompletedQuestRequirements(userId, questId, dbClient).map(
      (completedRequirements) => ({
        isAllCompleted: completedRequirements.length === requirements.length,
        completedRequirements
      })
    )
  }

  const completeQuestRequirement = ({ questId, type }: { questId: QuestId; type: EventId }) =>
    ResultAsync.fromPromise(
      dbClient.completedQuestRequirement.upsert({
        where: {
          questId_userId_requirementId: {
            userId,
            questId,
            requirementId: type
          }
        },
        update: {},
        create: {
          userId,
          questId,
          requirementId: type
        }
      }),
      (error) => ({ reason: WorkerError.FailedToCompleteQuestRequirement, jsError: error })
    )

  const isQuestRequirementCompleted = ({
    questId,
    requirementId
  }: {
    questId: QuestId
    requirementId: string
  }) =>
    ResultAsync.fromPromise(
      dbClient.completedQuestRequirement.count({
        where: { questId, requirementId, userId }
      }),
      (error) => ({ reason: WorkerError.FailedToCheckIfQuestRequirementCompleted, jsError: error })
    ).map((n) => n > 0)

  const addCompletedQuestRequirement = ({
    questId,
    requirementId
  }: {
    questId: QuestId
    requirementId: string
  }) =>
    isQuestRequirementCompleted({
      questId,
      requirementId
    }).andThen((isCompleted) =>
      isCompleted
        ? okAsync(undefined)
        : ResultAsync.fromPromise(
            dbClient.completedQuestRequirement.upsert({
              where: {
                questId_userId_requirementId: {
                  userId,
                  questId,
                  requirementId
                }
              },
              create: {
                userId,
                questId,
                requirementId
              },
              update: {}
            }),
            (error) => ({
              reason: WorkerError.FailedToAddCompletedQuestRequirement,
              jsError: error
            })
          ).andThen(() =>
            sendMessage(
              userId,
              {
                type: 'QuestRequirementCompleted',
                traceId,
                requirementId,
                questId
              },
              logger
            )
          )
    )

  const updateQuestProgressStatus = ({
    questId,
    status
  }: {
    questId: string
    status: QuestStatus
  }) =>
    ResultAsync.fromPromise(
      dbClient.questProgress.upsert({
        where: {
          questId_userId: {
            userId,
            questId
          }
        },
        create: {
          userId,
          questId,
          status
        },
        update: {
          status
        }
      }),
      (error) => ({ reason: WorkerError.FailedToUpdateQuestProgress, jsError: error })
    )

  const depositQuestReward = (questId: QuestId) => {
    const questDefinition = QuestDefinitions()[questId]
    const hasRewards = questDefinition.rewards.length

    return hasRewards
      ? transactionIntentHelper.add(
          {
            userId,
            discriminator: `${questId}:DepositReward:${userId}`,
            type: 'DepositReward',
            traceId,
            questId
          },
          priority
        )
      : updateQuestProgressStatus({ questId, status: 'REWARDS_CLAIMED' }).map(() => undefined)
  }

  const handleAllQuestRequirementCompleted = (questId: QuestId) =>
    hasCompletedAllQuestRequirements(questId, userId).andThen((value) => {
      if (value.isAllCompleted) {
        return depositQuestReward(questId).andThen(() =>
          sendMessage(userId, { type: 'QuestRequirementsCompleted', questId, traceId }).map(
            () => value
          )
        )
      }

      return okAsync(value)
    })

  type ShouldRemoveTrackedAccountAddressFnInput = {
    isAllCompleted: boolean
    completedRequirements: {
      questId: string
      userId: string
      requirementId: string
      createdAt: Date
    }[]
  }

  type ShouldRemoveTrackedAccountAddressFn = (
    value: ShouldRemoveTrackedAccountAddressFnInput
  ) => boolean

  const handleQuestWithTrackedAccount = (
    questId: QuestId,
    type: EventId,
    shouldRemoveTrackedAccountAddressFn: ShouldRemoveTrackedAccountAddressFn = () => true
  ): ResultAsync<undefined, WorkerOutputError> => {
    const values = {
      questId,
      requirementId: type,
      userId,
      transactionId,
      traceId
    }

    return completeQuestRequirement({ questId, type })
      .andThen(() =>
        sendMessage(
          userId,
          {
            type: 'QuestRequirementCompleted',
            requirementId: values.requirementId,
            questId,
            traceId
          },
          logger
        )
      )
      .andThen(() => handleAllQuestRequirementCompleted(questId))
      .andThen((value) =>
        shouldRemoveTrackedAccountAddressFn(value)
          ? accountAddressModel.deleteTrackedAddress(accountAddress, questId).mapErr((error) => ({
              reason: WorkerError.FailedToDeleteTrackedAccountAddress,
              jsError: error
            }))
          : okAsync(undefined)
      )
      .map(() => undefined)
  }

  return {
    handleAllQuestRequirementCompleted,
    updateQuestProgressStatus,
    addCompletedQuestRequirement,
    completeQuestRequirement,
    handleQuestWithTrackedAccount
  }
}
