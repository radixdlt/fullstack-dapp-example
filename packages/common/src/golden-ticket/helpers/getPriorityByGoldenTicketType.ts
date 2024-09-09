import type { GoldenTicket } from 'database'
import { Priority } from '../../constants'

export const getPriorityByGoldenTicketType = (maybeGoldenTicket?: GoldenTicket): number =>
  maybeGoldenTicket?.status === 'CLAIMED' && maybeGoldenTicket?.type === 'FULL'
    ? Priority.High
    : maybeGoldenTicket?.status === 'CLAIMED' && maybeGoldenTicket?.type === 'LIMITED'
      ? Priority.Medium
      : Priority.Low
