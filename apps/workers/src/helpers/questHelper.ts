import {
  AccountAddressModel,
  AppLogger,
  EventId,
  MailerLiteModel,
  WorkerError,
  TransactionIntentHelper
} from 'common'
import { QuestDefinitions, QuestId, Quests } from 'content'
import { PrismaClient, QuestStatus } from 'database'
import { ResultAsync, okAsync } from 'neverthrow'
import { MessageHelper } from './messageHelper'
import { WorkerOutputError } from '../_types'
import { getUserEmail } from './getUserEmail'

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
  mailerLiteModel
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
  mailerLiteModel: ReturnType<MailerLiteModel>
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

  const addCompletedQuestRequirement = ({
    questId,
    requirementId
  }: {
    questId: string
    requirementId: string
  }) =>
    ResultAsync.fromPromise(
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
      (error) => ({ reason: WorkerError.FailedToAddCompletedQuestRequirement, jsError: error })
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

  const depositQuestReward = (questId: QuestId) =>
    transactionIntentHelper.add({
      userId,
      discriminator: `${questId}:DepositReward:${userId}`,
      type: 'DepositReward',
      traceId,
      questId
    })

  const handleAllQuestRequirementCompleted = (questId: QuestId) =>
    hasCompletedAllQuestRequirements(questId, userId).andThen((value) => {
      if (value.isAllCompleted)
        return depositQuestReward(questId).andThen(() =>
          sendMessage(userId, { type: 'QuestRequirementsCompleted', questId, traceId }).map(
            () => value
          )
        )

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

  const handleMailerLiteBasicQuestFinished = (questId: string) => {
    if (questId !== 'TransferTokens') return okAsync(undefined)

    return getUserEmail(userId, dbClient).andThen((user) => {
      if (!user) return okAsync(undefined)

      return mailerLiteModel.addOrUpdate(user.email, { hasFinishedBasicQuests: true })
    })
  }

  return {
    handleAllQuestRequirementCompleted,
    updateQuestProgressStatus,
    addCompletedQuestRequirement,
    completeQuestRequirement,
    handleQuestWithTrackedAccount,
    handleMailerLiteBasicQuestFinished
  }
}
