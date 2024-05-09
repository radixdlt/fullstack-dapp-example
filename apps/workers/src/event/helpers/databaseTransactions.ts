import { ResultAsync } from 'neverthrow'
import { AppLogger, AuditResource, NotificationType } from 'common'
import { AuditType, PrismaClient, QuestStatus } from 'database'
import { EventId } from 'content'

export const databaseTransactions = ({
  dbClient,
  logger,
  transactionId
}: {
  dbClient: PrismaClient
  logger: AppLogger
  transactionId: string
}) => {
  const setQuestProgressStatus = (status: QuestStatus, userId: string, questId: string) =>
    dbClient.questProgress.update({
      where: {
        questId_userId: {
          userId,
          questId
        }
      },
      data: {
        status
      }
    })

  const createNotification = (type: NotificationType, userId: string, questId: string) =>
    dbClient.notification.create({
      data: {
        userId,
        data: {
          type,
          questId
        }
      }
    })

  const updateEvent = (transactionId: string, userId: string, questId: string) =>
    dbClient.event.update({
      where: {
        transactionId
      },
      data: {
        questId,
        userId
      }
    })

  const rewardsDeposited = ({
    userId,
    questId,
    xrdUsdValue,
    resources
  }: {
    userId: string
    questId: string
    xrdUsdValue: number
    resources: AuditResource[]
  }) =>
    ResultAsync.fromPromise(
      dbClient.$transaction([
        setQuestProgressStatus(QuestStatus.REWARDS_DEPOSITED, userId, questId),
        createNotification('QuestRewardsDeposited', userId, questId),
        updateEvent(transactionId, userId, questId),
        dbClient.audit.create({
          data: {
            transactionId,
            userId,
            type: AuditType.CLAIMBOX_DEPOSIT,
            xrdUsdValue,
            metadata: JSON.stringify({ resources })
          }
        })
      ]),
      (error) => {
        logger.error({
          error,
          method: 'databaseTransactions.rewardsDeposited',
          data: { userId, questId }
        })
        return {
          error,
          message: 'failed to set deposit rewards database entries'
        }
      }
    )

  const rewardsClaimed = ({ userId, questId }: { userId: string; questId: string }) =>
    ResultAsync.fromPromise(
      dbClient.$transaction([
        setQuestProgressStatus(QuestStatus.REWARDS_CLAIMED, userId, questId),
        updateEvent(transactionId, userId, questId),
        createNotification('QuestRewardsClaimed', userId, questId)
      ]),
      (error) => {
        logger.error({ error, method: 'databaseTransactions.rewardsClaimed' })
        return {
          error,
          message: 'failed to set deposit rewards database entries'
        }
      }
    )

  const userBadgeDeposited = ({
    userId,
    questId,
    xrdUsdValue,
    resources
  }: {
    userId: string
    questId: string
    xrdUsdValue: number
    resources: AuditResource[]
  }) =>
    ResultAsync.fromPromise(
      dbClient.$transaction([
        dbClient.completedQuestRequirement.create({
          data: {
            userId,
            questId,
            requirementId: EventId.DepositUserBadge
          }
        }),
        dbClient.notification.create({
          data: {
            userId,
            data: {
              type: 'QuestRequirementCompleted',
              questId,
              requirementId: EventId.DepositUserBadge
            }
          }
        }),
        updateEvent(transactionId, userId, questId),
        dbClient.audit.create({
          data: {
            transactionId,
            userId,
            type: AuditType.DIRECT_DEPOSIT,
            xrdUsdValue,
            metadata: JSON.stringify({ resources })
          }
        })
      ]),
      (error) => {
        logger.error({
          error,
          method: 'databaseTransactions.userBadgeDeposited',
          data: { userId, questId }
        })
        return {
          error,
          message: 'failed to set deposit rewards database entries'
        }
      }
    )

  const jettyReceivedClams = ({ userId, amount }: { userId: string; amount: number }) => {
    return ResultAsync.fromPromise(
      dbClient.$transaction([
        dbClient.completedQuestRequirement.create({
          data: {
            userId,
            questId: 'TransferTokens',
            requirementId: EventId.JettyReceivedClams
          }
        }),
        dbClient.notification.create({
          data: {
            userId,
            data: {
              type: 'QuestRequirementCompleted',
              questId: 'TransferTokens',
              requirementId: EventId.JettyReceivedClams
            }
          }
        }),
        updateEvent(transactionId, userId, 'TransferTokens')
      ]),
      (error) => {
        logger.error({
          error,
          method: 'databaseTransactions.jettyReceivedClams',
          data: { userId, questId: 'TransferTokens' }
        })
        return {
          error,
          message: 'failed to set deposit rewards database entries'
        }
      }
    )
  }

  const xrdStaked = ({ userId }: { userId: string }) => {
    return ResultAsync.fromPromise(
      dbClient.$transaction([
        dbClient.completedQuestRequirement.create({
          data: {
            userId,
            questId: 'StakingQuest',
            requirementId: 'StakedXrd'
          }
        }),
        dbClient.notification.create({
          data: {
            userId,
            data: {
              type: 'QuestRequirementCompleted',
              questId: 'StakingQuest',
              requirementId: 'StakedXrd'
            }
          }
        })
      ]),
      (error) => {
        logger.error({
          error,
          method: 'databaseTransactions.xrdStaked',
          data: { userId, questId: 'StakingQuest' }
        })
        return {
          error,
          message: 'failed to set staking quest database entries'
        }
      }
    )
  }

  return { rewardsDeposited, rewardsClaimed, userBadgeDeposited, jettyReceivedClams, xrdStaked }
}
