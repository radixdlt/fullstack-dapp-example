import type { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { type ConnectionOptions, Queue } from 'bullmq'
import { ResultAsync } from 'neverthrow'
import { EventId, GiftBoxKind, typedError } from 'common'

export const Queues = {
  EventQueue: 'EventQueue',
  SystemQueue: 'SystemQueue',
  TransactionQueue: 'TransactionQueue'
} as const

export const SystemJobType = {
  PopulateRadmorphs: 'PopulateRadmorphs'
} as const

export type EventJob = {
  type: EventId
  traceId: string
  transactionId: string
  relevantEvents: Record<string, EventsItem>
}

export type DepositRewardTransactionJob = {
  type: 'DepositReward'
  questId: string
}

export type CombinedElementsMintRadgemTransactionJob = {
  type: 'CombinedElementsMintRadgem'
}

export type CombinedElementsAddRadgemImageTransactionJob = {
  type: 'CombinedElementsAddRadgemImage'
  radgemId: string
}

export type PopulateResourcesTransactionJob = {
  type: 'PopulateResources'
  accountAddress: string
}

export type AddAccountAddressToHeroBadgeForgeJob = {
  type: 'AddAccountAddressToHeroBadgeForge'
  accountAddress: string
}

export type DepositXrdToAccount = {
  type: 'DepositXrdToAccount'
}

export type DepositPartialRewardTransactionJob = {
  type: 'DepositPartialReward'
  questId: string
  requirement: string
}

export type DepositXrdRewardTransactionJob = {
  type: 'DepositXrdReward'
  questId: string
  amount: number
  transactionId: string
}

export type DepositGiftBoxRewardTransactionJob = {
  type: 'DepositGiftBoxReward'
  giftBoxKind: GiftBoxKind
}

export type TransactionJob = {
  userId: string
  discriminator: string
  traceId: string
} & (
  | DepositRewardTransactionJob
  | CombinedElementsMintRadgemTransactionJob
  | DepositPartialRewardTransactionJob
  | DepositXrdRewardTransactionJob
  | CombinedElementsAddRadgemImageTransactionJob
  | PopulateResourcesTransactionJob
  | AddAccountAddressToHeroBadgeForgeJob
  | DepositXrdToAccount
  | DepositGiftBoxRewardTransactionJob
)

export type RadmorphSystemJob = {
  type: (typeof SystemJobType)['PopulateRadmorphs']
  data: {
    url: string
    id: string
  }[]
  traceId: string
}

export type SystemJob = RadmorphSystemJob

export type TQueues = ReturnType<typeof getQueues>
export type TransactionQueue = TQueues['transactionQueue']
export type EventQueue = TQueues['eventQueue']
export type SystemQueue = TQueues['systemQueue']

export const getQueues = (connection: ConnectionOptions) => {
  const eventQueue = new Queue<EventJob>(Queues.EventQueue, {
    connection
  })

  const transactionQueue = new Queue<TransactionJob>(Queues.TransactionQueue, {
    connection
  })

  const systemQueue = new Queue<SystemJob>(Queues.SystemQueue, {
    connection
  })

  const addBulk = (items: EventJob[]) =>
    ResultAsync.fromPromise(
      eventQueue.addBulk(
        items.map((item) => ({ name: item.traceId, data: item, opts: { jobId: item.traceId } }))
      ),
      typedError
    )

  const addJob = (job: EventJob) =>
    ResultAsync.fromPromise(eventQueue.add(job.transactionId, job), typedError)

  const addTransactionJob = (item: TransactionJob) =>
    ResultAsync.fromPromise(
      transactionQueue.add(item.discriminator, item, { jobId: item.discriminator }),
      typedError
    )

  return {
    eventQueue: { addBulk, queue: eventQueue, addJob },
    transactionQueue: { queue: transactionQueue, add: addTransactionJob },
    systemQueue: {
      addBulk: (items: SystemJob[]) =>
        ResultAsync.fromPromise(
          systemQueue.addBulk(
            items.map((item) => ({ name: item.traceId, data: item, opts: { jobId: item.traceId } }))
          ),
          typedError
        ),
      queue: systemQueue
    }
  }
}
