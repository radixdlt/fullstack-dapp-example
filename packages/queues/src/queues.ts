import { type ConnectionOptions, Queue } from 'bullmq'
import { ResultAsync } from 'neverthrow'
import { EventId, GiftBoxKind, typedError } from 'common'

type GenericJob<J = Record<string, any>, I extends keyof J = keyof J> = J & {
  [key in I]: unknown
}

export const Queues = {
  EventQueue: 'EventQueue',
  SystemQueue: 'SystemQueue',
  TransactionQueue: 'TransactionQueue',
  DepositGiftBoxRewardQueue: 'DepositGiftBoxRewardQueue',
  DepositGiftBoxRewardBufferQueue: 'DepositGiftBoxRewardBufferQueue'
} as const

export type SystemJobType = (typeof SystemJobType)[keyof typeof SystemJobType]
export const SystemJobType = {
  PopulateRadmorphs: 'PopulateRadmorphs',
  AddReferral: 'AddReferral',
  UpdateKycOracle: 'UpdateKycOracle',
  UpdateLettySwapDappDefinition: 'UpdateLettySwapDappDefinition',
  UpdateKycBadgeAddress: 'UpdateKycBadgeAddress'
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

export type DepositGiftBoxesRewardJob = GenericJob<
  TransactionJob & DepositGiftBoxesRewardTransactionJob,
  'discriminator'
>

export type BatchedDepositGiftBoxesRewardJob = GenericJob<
  { id: string; items: DepositGiftBoxesRewardJob[] },
  'id'
>

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
  keyImageUrl: string
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

export type DepositGiftBoxRewardTransactionJob = {
  type: 'DepositGiftBoxReward'
  giftBoxKind: GiftBoxKind
}

export type DepositGiftBoxesRewardTransactionJob = {
  type: 'DepositGiftBoxesReward'
  giftBoxKind: GiftBoxKind
  amount: number
}

export type QuestCompletedTransactionJob = {
  type: 'QuestCompleted'
  questId: string
}

export type ElementsDepositedTransactionJob = {
  type: 'ElementsDeposited'
  elementsCount: number
}

export type TransactionJob = {
  userId: string
  discriminator: string
  traceId: string
} & (
  | DepositRewardTransactionJob
  | CombinedElementsMintRadgemTransactionJob
  | DepositPartialRewardTransactionJob
  | CombinedElementsAddRadgemImageTransactionJob
  | PopulateResourcesTransactionJob
  | AddAccountAddressToHeroBadgeForgeJob
  | DepositXrdToAccount
  | QuestCompletedTransactionJob
  | DepositGiftBoxRewardTransactionJob
  | DepositGiftBoxesRewardTransactionJob
  | ElementsDepositedTransactionJob
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

export type UpdateLettySwapDappDefinitionSystemJob = {
  type: (typeof SystemJobType)['UpdateLettySwapDappDefinition']
  traceId: string
}

export type UpdateKycBadgeAddressSystemJob = {
  type: (typeof SystemJobType)['UpdateKycBadgeAddress']
  traceId: string
}

export type SystemJob =
  | RadmorphSystemJob
  | AddReferralSystemJob
  | UpdateKycOracleSystemJob
  | UpdateLettySwapDappDefinitionSystemJob
  | UpdateKycBadgeAddressSystemJob

export type DepositXrdJob = GenericJob<{
  userId: string
  accountAddress: string
  traceId: string
}>

export type TQueues = ReturnType<typeof getQueues>
export type TransactionQueue = TQueues['transactionQueue']
export type EventQueue = TQueues['eventQueue']
export type SystemQueue = TQueues['systemQueue']
export type DepositGiftBoxRewardQueue = TQueues['DepositGiftBoxRewardQueue']
export type DepositGiftBoxRewardBufferQueue = TQueues['DepositGiftBoxRewardBufferQueue']

const defaultJobOptions = {
  attempts: 10
}

const createQueue = <J extends GenericJob>(
  name: keyof typeof Queues,
  jobIdKey: keyof J,
  connection: ConnectionOptions
) => {
  const queue = new Queue<J>(name, {
    connection,
    defaultJobOptions
  })

  const add = (job: J) =>
    ResultAsync.fromPromise(
      queue.add(job[jobIdKey], job, {
        jobId: job[jobIdKey],
        removeOnComplete: true,
        removeOnFail: 300
      }),
      typedError
    )

  const addBulk = (items: J[]) =>
    ResultAsync.fromPromise(
      queue.addBulk(
        items.map((item) => ({
          name: item[jobIdKey],
          data: item,
          opts: { jobId: item[jobIdKey], removeOnComplete: 100, removeOnFail: 300 }
        }))
      ),
      typedError
    )

  return { queue, addBulk, add }
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
    },
    [Queues.DepositGiftBoxRewardQueue]: createQueue<BatchedDepositGiftBoxesRewardJob>(
      'DepositGiftBoxRewardQueue',
      'id',
      connection
    ),
    [Queues.DepositGiftBoxRewardBufferQueue]: createQueue<DepositGiftBoxesRewardJob>(
      'DepositGiftBoxRewardBufferQueue',
      'discriminator',
      connection
    )
  }
}
