import { type ConnectionOptions, Queue } from 'bullmq'
import { ResultAsync } from 'neverthrow'
import { EventId, GiftBoxKind, typedError } from 'common'

export const Queues = {
  EventQueue: 'EventQueue',
  SystemQueue: 'SystemQueue',
  TransactionQueue: 'TransactionQueue'
} as const

export type SystemJobType = (typeof SystemJobType)[keyof typeof SystemJobType]
export const SystemJobType = {
  PopulateRadmorphs: 'PopulateRadmorphs',
  AddReferral: 'AddReferral',
  UpdateKycOracle: 'UpdateKycOracle'
} as const

export type EventJob = {
  type: EventId
  traceId: string
  eventId: string
  questId?: string
  transactionId: string
  userId: string
  data: Record<string, unknown>
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

export type AddReferralSystemJob = {
  type: (typeof SystemJobType)['AddReferral']
  userId: string
  referralCode: string
  traceId: string
}

export type UpdateKycOracleSystemJob = {
  type: (typeof SystemJobType)['UpdateKycOracle']
  userId: string
  traceId: string
}

export type SystemJob = RadmorphSystemJob | AddReferralSystemJob | UpdateKycOracleSystemJob

export type TQueues = ReturnType<typeof getQueues>
export type TransactionQueue = TQueues['transactionQueue']
export type EventQueue = TQueues['eventQueue']
export type SystemQueue = TQueues['systemQueue']

const defaultJobOptions = {
  attempts: 10
}

export const getQueues = (connection: ConnectionOptions) => {
  const eventQueue = new Queue<EventJob>(Queues.EventQueue, {
    connection,
    defaultJobOptions
  })

  const transactionQueue = new Queue<TransactionJob>(Queues.TransactionQueue, {
    connection,
    defaultJobOptions
  })

  const systemQueue = new Queue<SystemJob>(Queues.SystemQueue, {
    connection
  })

  const addBulk = (items: EventJob[]) =>
    ResultAsync.fromPromise(
      eventQueue.addBulk(
        items.map((item) => ({
          name: item.transactionId,
          data: item,
          opts: { jobId: item.transactionId, removeOnComplete: true, removeOnFail: 300 }
        }))
      ),
      typedError
    )

  const addJob = (job: EventJob) =>
    ResultAsync.fromPromise(
      eventQueue.add(job.transactionId, job, {
        jobId: job.transactionId,
        removeOnComplete: true,
        removeOnFail: 300
      }),
      typedError
    )

  const addTransactionJob = (item: TransactionJob) =>
    ResultAsync.fromPromise(
      transactionQueue.add(item.discriminator, item, {
        jobId: item.discriminator,
        removeOnComplete: true,
        removeOnFail: 300
      }),
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
