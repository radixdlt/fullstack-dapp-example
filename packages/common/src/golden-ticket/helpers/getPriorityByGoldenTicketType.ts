import type { Prisma } from 'database'
import { Priority } from '../../constants'

export const getPriorityByGoldenTicketType = (
  maybeGoldenTicket?: Prisma.GoldenTicketGetPayload<{
    include: { batch: true }
  }>
): number =>
  maybeGoldenTicket?.status === 'CLAIMED' && maybeGoldenTicket?.batch.type === 'FULL'
    ? Priority.High
    : maybeGoldenTicket?.status === 'CLAIMED' && maybeGoldenTicket?.batch.type === 'LIMITED'
      ? Priority.Medium
      : Priority.Low
