import { type GoldenTicketBatch, PrismaClient } from 'database'
import { type AppLogger, getRandomReferralCode } from '..'
import * as crypto from 'crypto'
import { resultWrapperWithLogger } from '../helpers/db-wrapper'

const bigIntToNumber = (bigInt: BigInt) => Number(bigInt?.toString() || 0)

export enum GoldenTicketError {
  NOT_FOUND = 'Ticket not found',
  ALREADY_CLAIMED = 'Ticket already claimed',
  EXPIRED = 'Ticket expired'
}

export type GoldenTicketModel = ReturnType<typeof GoldenTicketModel>

export const GoldenTicketModel = (dbClient: PrismaClient) => (logger?: AppLogger) => {
  const wrapper = resultWrapperWithLogger(logger)

  const getTicket = (id: string) =>
    dbClient.goldenTicket.findUnique({
      where: { id },
      include: { batch: true }
    })

  const getBatch = (batchId: string) =>
    (
      dbClient.$queryRaw`
    SELECT
      b.*,
      COUNT(t.id) as ticketCount,
      COUNT(t."claimedAt") as claimedCount,
      COUNT(t."claimedAt") FILTER (WHERE t."status" = 'CLAIMED_INVALID') as claimedInvalidCount
    FROM "GoldenTicketBatch" b
    LEFT JOIN "GoldenTicket" t ON t."batchId" = b."id"
    WHERE b."id" = ${batchId}
    GROUP BY b."id"
  ` as Promise<
        GoldenTicketBatch &
          {
            ticketcount: BigInt
            claimedcount: BigInt
            claimedInvalidcount: BigInt
          }[]
      >
    ).then(([batch]) => ({
      ...batch,
      ticketCount: bigIntToNumber(batch.ticketcount),
      claimedCount: bigIntToNumber(batch.claimedcount),
      claimedInvalidCount: bigIntToNumber(batch.claimedInvalidcount)
    }))

  const getAllBatches = () =>
    (
      dbClient.$queryRaw`
    SELECT
      b.*,
      COUNT(t.id) as ticketCount,
      COUNT(t."claimedAt") as claimedCount,
      COUNT(t."claimedAt") FILTER (WHERE t."status" = 'CLAIMED_INVALID') as claimedInvalidCount
    FROM "GoldenTicketBatch" b
    LEFT JOIN "GoldenTicket" t ON t."batchId" = b."id"
    GROUP BY b."id"
  ` as Promise<
        (GoldenTicketBatch & {
          ticketcount: BigInt
          claimedcount: BigInt
          claimedInvalidcount: BigInt
        })[]
      >
    ).then((batches) =>
      batches.map((batch) => ({
        ...batch,
        ticketCount: bigIntToNumber(batch.ticketcount),
        claimedCount: bigIntToNumber(batch.claimedcount),
        claimedInvalidCount: bigIntToNumber(batch.claimedInvalidcount)
      }))
    )

  const getTicketsInBatch = (batchId: string, userId: string) =>
    dbClient.goldenTicket.findMany({ where: { batchId, userId }, include: { batch: true } })

  const createBatch = (
    count: number,
    expiresAt: Date,
    ownerId: string,
    description?: string,
    type: 'FULL' | 'LIMITED' = 'FULL'
  ) => {
    const batchId = crypto.randomUUID() as string

    const tickets = Array.from({ length: count }, () => ({
      id: getRandomReferralCode(
        16,
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      )
    }))

    return dbClient.goldenTicketBatch
      .create({
        data: {
          id: batchId,
          expiresAt,
          ownerId,
          description,
          type,
          tickets: { create: tickets }
        }
      })
      .then(() => tickets)
  }

  const importBatch = (
    tickets: string[],
    expiresAt: Date,
    ownerId: string,
    description?: string
  ) => {
    const batchId = crypto.randomUUID() as string

    const ticketData = tickets.map((id) => ({
      id,
      batchId
    }))

    return dbClient.goldenTicketBatch
      .create({
        data: {
          id: batchId,
          expiresAt,
          ownerId,
          description
        }
      })
      .then(() => dbClient.goldenTicket.createMany({ data: ticketData }))
      .then(() => ticketData)
  }

  const claimTicket = async (id: string, userId: string) => {
    const ticket = await dbClient.goldenTicket.findUnique({
      where: { id },
      include: { batch: true }
    })

    const batch = await dbClient.goldenTicketBatch.findUnique({
      where: { id: ticket?.batchId }
    })

    if (ticket && batch) {
      if (ticket.claimedAt) throw new Error(GoldenTicketError.ALREADY_CLAIMED)
      if (batch.expiresAt.getTime() <= Date.now()) {
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
    dbClient.goldenTicketBatch.update({
      where: { id: batchId },
      data: { expiresAt }
    })

  const userHasClaimedTicket = (userId: string) =>
    (dbClient as any)
      .$primary()
      .goldenTicket.count({ where: { userId, status: 'CLAIMED' } })
      .then((count: number) => count > 0)

  const createSilverTicketBatch = (count: number, ownerId: string) =>
    createBatch(
      count,
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // in 1 year
      ownerId,
      '',
      'LIMITED'
    )

  const getOwnedTicketBatches = (ownerId: string) =>
    dbClient.user
      .findUnique({
        include: {
          goldenTicketBatchesOwned: { include: { _count: { select: { tickets: true } } } }
        },
        where: { id: ownerId }
      })
      .then((value) =>
        value
          ? value.goldenTicketBatchesOwned.map((batch) => ({
              ...batch,
              ticketCount: batch._count.tickets
            }))
          : []
      )

  const updateSilverTicketBatch = (
    ownerId: string,
    batchId: string,
    expiresAt: Date,
    description: string
  ) =>
    dbClient.goldenTicketBatch.update({
      where: { ownerId, id: batchId },
      data: { expiresAt, description }
    })

  return {
    getTicket: wrapper('getTicket')(getTicket),
    getBatch: wrapper('getBatch')(getBatch),
    getAllBatches: wrapper('getAll')(getAllBatches),
    createBatch: wrapper('createBatch')(createBatch),
    importBatch: wrapper('importBatch')(importBatch),
    setExpirationDateOnBatch: wrapper('setExpirationDateOnBatch')(setExpirationDateOnBatch),
    claimTicket: wrapper('claimTicket')(claimTicket),
    userHasClaimedTicket: wrapper('userHasClaimedTicket')(userHasClaimedTicket),
    createSilverTicketBatch: wrapper('createSilverTicketBatch')(createSilverTicketBatch),
    getOwnedTicketBatches: wrapper('getOwnedSilverTickets')(getOwnedTicketBatches),
    updateSilverTicketBatch: wrapper('updateSilverTicketBatch')(updateSilverTicketBatch),
    getTicketsInBatch: wrapper('getTicketsInBatch')(getTicketsInBatch)
  }
}
