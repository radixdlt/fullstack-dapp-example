import { type ConnectionOptions, Queue } from 'bullmq'
import { ResultAsync } from 'neverthrow'
import { EventId, GiftBoxKind, typedError } from 'common'

type GenericJob<J = Record<string, any>, I extends keyof J = keyof J> = J & {
  [key in I]: unknown
}

export type BatchJob<J extends GenericJob> = { id: string; items: J[] }

export type QueueName = (typeof QueueName)[keyof typeof QueueName]
export const QueueName = {
  Event: 'Event',
  System: 'System',
  Transaction: 'Transaction',
  DepositGiftBoxReward: 'DepositGiftBoxReward'
} as const

export type SystemJobType = (typeof SystemJobType)[keyof typeof SystemJobType]
export const SystemJobType = {
  PopulateRadmorphs: 'PopulateRadmorphs',
  AddReferral: 'AddReferral',
  UpdateKycOracle: 'UpdateKycOracle',
  UpdateLettySwapDappDefinition: 'UpdateLettySwapDappDefinition',
  UpdateKycBadgeAddress: 'UpdateKycBadgeAddress',
  PopulateResources: 'PopulateResources'
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

export type DepositRewardTransactionJob = {
  type: 'DepositReward'
  questId: string
}

export type AddAccountAddressToHeroBadgeForgeJob = {
  type: 'AddAccountAddressToHeroBadgeForge'
  accountAddress: string
}

export type DepositXrdToAccountTransactionJob = {
  type: 'DepositXrdToAccount'
}

export type DepositPartialRewardTransactionJob = {
  type: 'DepositPartialReward'
  questId: string
  requirement: string
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
  | DepositPartialRewardTransactionJob
  | AddAccountAddressToHeroBadgeForgeJob
  | DepositXrdToAccountTransactionJob
  | QuestCompletedTransactionJob
  | DepositGiftBoxesRewardTransactionJob
  | ElementsDepositedTransactionJob
)

export type RadmorphSystemJob = {
  id: string
  type: (typeof SystemJobType)['PopulateRadmorphs']
  data: {
    url: string
    id: string
  }[]
}

export type AddReferralSystemJob = {
  id: string
  type: (typeof SystemJobType)['AddReferral']
  userId: string
  referralCode: string
}

export type UpdateKycOracleSystemJob = {
  id: string
  type: (typeof SystemJobType)['UpdateKycOracle']
  userId: string
}

export type UpdateLettySwapDappDefinitionSystemJob = {
  id: string
  type: (typeof SystemJobType)['UpdateLettySwapDappDefinition']
}

export type UpdateKycBadgeAddressSystemJob = {
  id: string
  type: (typeof SystemJobType)['UpdateKycBadgeAddress']
}

export type PopulateResourcesSystemJob = {
  id: string
  type: (typeof SystemJobType)['PopulateResources']
  accountAddress: string
  userId: string
}

export type SystemJob =
  | RadmorphSystemJob
  | AddReferralSystemJob
  | UpdateKycOracleSystemJob
  | UpdateLettySwapDappDefinitionSystemJob
  | UpdateKycBadgeAddressSystemJob
  | PopulateResourcesSystemJob

export type DepositXrdJob = GenericJob<{
  userId: string
  accountAddress: string
  traceId: string
}>

const defaultJobOptions = {
  attempts: 10
}

const createQueue = <J extends GenericJob>(
  name: string,
  jobIdKey: keyof J,
  connection: ConnectionOptions
) => {
  const queue = new Queue<J>(name, {
    connection,
    defaultJobOptions
  })

  const add = (items: J[]) =>
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

  return { queue, add, name, getBufferQueue: () => undefined }
}

export type BufferQueue = ReturnType<typeof createBufferQueue>
const createBufferQueue = <J extends GenericJob>(
  queueName: keyof typeof QueueName,
  jobIdKey: keyof J,
  connection: ConnectionOptions
) => {
  const { queue, add } = createQueue<BatchJob<J>>(queueName, 'id', connection)
  const buffer = createQueue<J>(`${queueName}Buffer`, jobIdKey, connection)

  return { add, queue, buffer, name: queueName, getBufferQueue: () => buffer }
}

export type Queues = ReturnType<typeof getQueues>

export const getQueues = (connection: ConnectionOptions) => ({
  Event: createQueue<EventJob>(QueueName.Event, 'transactionId', connection),
  Transaction: createQueue<TransactionJob>(QueueName.Transaction, 'discriminator', connection),
  System: createQueue<SystemJob>(QueueName.System, 'id', connection),
  DepositGiftBoxReward: createBufferQueue<DepositGiftBoxesRewardJob>(
    'DepositGiftBoxReward',
    'discriminator',
    connection
  )
})
