import { AuditType, PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { AppLogger } from '../helpers'
import { GiftBoxReward } from '../gift-box-reward/gift-box-reward'

export type AuditModel = ReturnType<typeof AuditModel>

export const AuditDataKind = { fungible: 'fungible', nonFungible: 'nonFungible' } as const

export type AuditData = {
  [AuditDataKind.fungible]: { name: string; amount: number }[]
  [AuditDataKind.nonFungible]: ReturnType<GiftBoxReward>['energyCard'][]
}

export const AuditModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const add = ({
    type,
    userId,
    xrdUsdValue,
    transactionId,
    data
  }: {
    transactionId: string
    userId: string
    type: AuditType
    xrdUsdValue: number
    data: AuditData
  }) =>
    ResultAsync.fromPromise(
      db.audit.create({
        data: {
          transactionId,
          userId,
          type,
          xrdUsdValue,
          data
        }
      }),
      (error) => {
        logger?.error({ error, method: 'add', model: 'AuditModel' })
        return createApiError('failed to add audit entry', 400)()
      }
    ).map(() => undefined)

  const getUsdAmount = (userId: string) =>
    ResultAsync.fromPromise(
      db.audit.aggregate({
        _sum: {
          xrdUsdValue: true
        },
        where: {
          userId
        }
      }),
      (error) => {
        logger?.error({ error, method: 'getUsdAmount', model: 'AuditModel' })
        return createApiError('failed to get usd amount', 400)()
      }
    ).map((result) => result._sum?.xrdUsdValue?.toNumber() ?? 0)

  return {
    add,
    getUsdAmount
  }
}
