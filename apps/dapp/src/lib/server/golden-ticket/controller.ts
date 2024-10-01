import { GoldenTicketModel, createApiError } from 'common'
import type { ControllerDependencies } from '../_types'

export type GoldenTicketController = ReturnType<typeof GoldenTicketController>
export const GoldenTicketController = ({ dbClient, logger }: ControllerDependencies) => {
  const model = GoldenTicketModel(dbClient)(logger)

  const getTicket = (id: string) =>
    model
      .getTicket(id)
      .map((data) => ({ data, httpResponseCode: 200 }))
      .mapErr(createApiError('Failed to get ticket', 400))

  const getBatch = (batchId: string) =>
    model
      .getBatch(batchId)
      .map((data) => ({ data, httpResponseCode: 200 }))
      .mapErr(createApiError('Failed to get batch', 400))

  const getAll = () =>
    model
      .getAllBatches()
      .map((data) => ({ data, httpResponseCode: 200 }))
      .mapErr(createApiError('Failed to get all tickets', 400))

  const claim = (id: string, userId: string) =>
    model
      .claimTicket(id, userId)
      .map((data) => ({ data, httpResponseCode: 200 }))
      .mapErr(createApiError('Failed to claim ticket', 400))

  const hasClaimed = (userId: string) =>
    model
      .userHasClaimedTicket(userId)
      .map((data) => ({ data, httpResponseCode: 200 }))
      .mapErr(createApiError('Failed to check if user has claimed a ticket', 400))

  const getOwnedTicketBatches = (userId: string) =>
    model
      .getOwnedTicketBatches(userId)
      .map((data) => ({ data, httpResponseCode: 200 }))
      .mapErr(createApiError('Failed to get owned silver tickets', 400))

  const updateSilverTicketBatch = (
    ownerId: string,
    batchId: string,
    expiresAt: Date,
    description: string
  ) =>
    model
      .updateSilverTicketBatch(ownerId, batchId, expiresAt, description)
      .map((data) => ({ data, httpResponseCode: 200 }))
      .mapErr(createApiError('Failed to update silver ticket batch', 400))

  const getTicketsInBatch = (batchId: string, userId: string) =>
    model
      .getTicketsInBatch(batchId, userId)
      .map((data) => ({ data, httpResponseCode: 200 }))
      .mapErr(createApiError('Failed to get tickets in batch', 400))

  return {
    getTicket,
    getBatch,
    getAll,
    claim,
    hasClaimed,
    getOwnedTicketBatches,
    updateSilverTicketBatch,
    getTicketsInBatch
  }
}
