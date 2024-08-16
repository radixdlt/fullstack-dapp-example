import { PrismaClient } from 'database'
import { type AppLogger, getRandomReferralCode } from '..'
import * as crypto from 'crypto'
import { resultWrapperWithLogger } from '../helpers/db-wrapper'

export enum GoldenTicketError {
  NOT_FOUND = 'Ticket not found',
  ALREADY_CLAIMED = 'Ticket already claimed',
  EXPIRED = 'Ticket expired'
}

export const GoldenTicketModel = (dbClient: PrismaClient) => (logger?: AppLogger) => {
  const wrapper = resultWrapperWithLogger(logger)

  const getTicket = (id: string) =>
    dbClient.goldenTicket.findUnique({
      where: { id }
    })

  const getBatch = (batchId: string) =>
    dbClient.goldenTicket.findMany({
      where: { batchId },
      orderBy: { createdAt: 'desc' }
    })

  const getAll = () => dbClient.goldenTicket.findMany({ orderBy: { createdAt: 'desc' } })

  const createBatch = (count: number, expiresAt: Date, ownerId: string) => {
    const batchId = crypto.randomUUID() as string

    const tickets = Array.from({ length: count }, () => ({
      id: getRandomReferralCode(
        16,
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      ),
      batchId,
      expiresAt,
      ownerId
    }))

    return dbClient.goldenTicket.createMany({ data: tickets })
  }

  const claimTicket = async (id: string, userId: string) => {
    const ticket = await dbClient.goldenTicket.findUnique({
      where: { id },
      select: { claimedAt: true, expiresAt: true }
    })

    if (ticket) {
      if (ticket.claimedAt) throw new Error(GoldenTicketError.ALREADY_CLAIMED)
      if (ticket.expiresAt.getTime() <= Date.now()) {
        await dbClient.goldenTicket.update({
          where: { id },
          data: { status: 'CLAIMED_INVALID', userId, claimedAt: new Date() }
        })
      } else {
        await dbClient.goldenTicket.update({
          where: { id },
          data: { status: 'CLAIMED', userId, claimedAt: new Date() }
        })
      }
    } else {
      throw new Error(GoldenTicketError.NOT_FOUND)
    }
  }

  const setExpirationDateOnBatch = (batchId: string, expiresAt: Date) =>
    dbClient.goldenTicket.updateMany({
      where: { batchId, claimedAt: null },
      data: { expiresAt }
    })

  const userHasClaimedTicket = (userId: string) =>
    dbClient.goldenTicket.count({ where: { userId, status: 'CLAIMED' } }).then((count) => count > 0)

  return {
    getTicket: wrapper('getTicket')(getTicket),
    getBatch: wrapper('getBatch')(getBatch),
    getAll: wrapper('getAll')(getAll),
    createBatch: wrapper('createBatch')(createBatch),
    setExpirationDateOnBatch: wrapper('setExpirationDateOnBatch')(setExpirationDateOnBatch),
    claimTicket: wrapper('claimTicket')(claimTicket),
    userHasClaimedTicket: wrapper('userHasClaimedTicket')(userHasClaimedTicket)
  }
}
