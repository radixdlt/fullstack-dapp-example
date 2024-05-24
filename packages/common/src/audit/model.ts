import { AuditType, PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers/create-api-error'
import type { ApiError, AppLogger } from '../helpers'



export type AuditModel = ReturnType<typeof AuditModel>

type AuditModelType = {
  add: (input: {
    transactionId: string
    userId: string
    type: AuditType
    xrdUsdValue: number
  }) => ResultAsync<void, ApiError>
  getUsdAmount: (userId: string) => ResultAsync<number, ApiError>
}

export const AuditModel =
  (db: PrismaClient) =>
  (logger?: AppLogger): AuditModelType => {
    const add = ({
      type,
      userId,
      xrdUsdValue,
      transactionId
    }: {
      transactionId: string
      userId: string
      type: AuditType
      xrdUsdValue: number
    }) =>
      ResultAsync.fromPromise(
        db.audit.create({
          data: {
            transactionId,
            userId,
            type,
            xrdUsdValue
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
