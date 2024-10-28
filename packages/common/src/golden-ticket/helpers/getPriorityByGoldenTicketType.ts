import type { GoldenTicketStatus, TicketType } from 'database'
import { Priority } from '../../constants'

export const getPriorityByGoldenTicketType = (maybeGoldenTicket?: {
  status: GoldenTicketStatus
  batch: { type: TicketType }
}): number =>
  maybeGoldenTicket?.status === 'CLAIMED' && maybeGoldenTicket?.batch.type === 'FULL'
    ? Priority.High
    : maybeGoldenTicket?.status === 'CLAIMED' && maybeGoldenTicket?.batch.type === 'LIMITED'
      ? Priority.Medium
      : Priority.Low
