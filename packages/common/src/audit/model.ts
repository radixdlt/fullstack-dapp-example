import { AuditType, PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import { AppLogger } from '../helpers'

export type AuditFungibleResource = { type: 'fungible'; amount: number; resourceAddress: string }

export type AuditNonFungibleResource = {
  type: 'nonFungible'
  resourceAddress: string
  localId: string
}

export type AuditResource = AuditFungibleResource | AuditNonFungibleResource

export type AuditModel = ReturnType<typeof AuditModel>

export const AuditModel = (db: PrismaClient) => (logger?: AppLogger) => {
  const add = (
    {
      type,
      userId,
      xrdUsdValue,
      transactionId
    }: { transactionId: string; userId: string; type: AuditType; xrdUsdValue: number },
    metadata: {
      resources: AuditResource[]
    }
  ) =>
    ResultAsync.fromPromise(
      db.audit.create({
        data: {
          transactionId,
          userId,
          type,
          xrdUsdValue,
          metadata: JSON.stringify(metadata)
        }
      }),
      (error) => {
        logger?.error({ error, method: 'add', model: 'AuditModel' })
        return createApiError('failed to add audit entry', 400)()
      }
    )

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
