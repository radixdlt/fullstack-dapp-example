import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { ConnectionOptions, Queue } from 'bullmq'
import { ResultAsync } from 'neverthrow'
import { typedError } from 'common'

export * from 'bullmq'

export const Queues = {
  EventQueue: 'EventQueue',
  TransactionQueue: 'TransactionQueue'
} as const

export const EventJobType = {
  QuestRewardDeposited: 'QuestRewardDeposited',
  QuestRewardClaimed: 'QuestRewardClaimed',
  UserBadge: 'UserBadge',
  JettyReceivedClams: 'JettyReceivedClams',
  XrdStaked: 'XrdStaked',
  CombineElementsDeposited: 'CombineElementsDeposited',
  CombineElementsMintedRadgem: 'CombineElementsMintedRadgem',
  CombineElementsAddedRadgemImage: 'CombineElementsAddedRadgemImage',
  CombineElementsClaimed: 'CombineElementsClaimed'
} as const

export type EventJobType = keyof typeof EventJobType

export type EventJob = {
  type: EventJobType
  traceId: string
  transactionId: string
  relevantEvents: Record<string, EventsItem>
}

export type DepositRewardTransactionJob = {
  type: 'DepositReward'
  questId: string
}

export type MintUserBadgeTransactionJob = {
  type: 'MintUserBadge'
  accountAddress: string
}

export type CombinedElementsMintRadgemTransactionJob = {
  type: 'CombinedElementsMintRadgem'
}

export type CombinedElementsAddRadgemImageTransactionJob = {
  type: 'CombinedElementsAddRadgemImage'
  imageUrl: string
}

export type TransactionJob = {
  attempt: number
  transactionKey: string
  badgeId: string
  badgeResourceAddress: string
  traceId: string
} & (
  | DepositRewardTransactionJob
  | MintUserBadgeTransactionJob
  | CombinedElementsMintRadgemTransactionJob
  | CombinedElementsAddRadgemImageTransactionJob
)

type TQueues = ReturnType<typeof getQueues>
export type TransactionQueue = TQueues['transactionQueue']
export type EventQueue = TQueues['eventQueue']

export const getQueues = (connection: ConnectionOptions) => {
  const eventQueue = new Queue<EventJob>(Queues.EventQueue, {
    connection
  })

  const transactionQueue = new Queue<TransactionJob>(Queues.TransactionQueue, {
    connection
  })

  const addBulk = (items: EventJob[]) =>
    ResultAsync.fromPromise(
      eventQueue.addBulk(
        items.map((item) => ({ name: item.traceId, data: item, opts: { jobId: item.traceId } }))
      ),
      typedError
    )

  const addTransactionJob = (item: TransactionJob) =>
    ResultAsync.fromPromise(transactionQueue.add(item.traceId, item), typedError)

  return {
    eventQueue: { addBulk, queue: eventQueue },
    transactionQueue: { queue: transactionQueue, add: addTransactionJob }
  }
}
