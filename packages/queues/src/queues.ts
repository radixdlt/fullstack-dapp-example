import { type ConnectionOptions, Queue } from 'bullmq'
import { ResultAsync } from 'neverthrow'
import { EventId, GiftBoxKind, typedError } from 'common'

export type GenericJob<J = Record<string, any>, I extends keyof J = keyof J> = J & {
  [key in I]: unknown
}

export type BatchJob<J extends GenericJob> = { id: string; items: J[] }

export type QueueName = (typeof QueueName)[keyof typeof QueueName]
export const QueueName = {
  Event: 'Event',
  System: 'System',
  Transaction: 'Transaction',
  DepositGiftBoxReward: 'DepositGiftBoxReward',
  DepositQuestReward: 'DepositQuestReward',
  DepositHeroBadge: 'DepositHeroBadge',
  CreateRadGems: 'CreateRadGems',
  DepositXrd: 'DepositXrd'
} as const

export type SystemJobType = (typeof SystemJobType)[keyof typeof SystemJobType]
export const SystemJobType = {
  PopulateRadmorphs: 'PopulateRadmorphs',
  AddReferral: 'AddReferral',
  UpdateLettySwapDappDefinition: 'UpdateLettySwapDappDefinition',
  UpdateKycBadgeAddress: 'UpdateKycBadgeAddress',
  PopulateResources: 'PopulateResources',
  MintElements: 'MintElements'
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

export type DepositQuestRewardJob = GenericJob<
  TransactionJob & DepositRewardTransactionJob,
  'discriminator'
>

export type DepositHeroBadgeJob = GenericJob<
  TransactionJob & DepositHeroBadgeTransactionJob,
  'discriminator'
>

export type CreateRadGemsJob = GenericJob<
  TransactionJob & ElementsDepositedTransactionJob,
  'discriminator'
>

export type DepositXrdJob = GenericJob<TransactionJob & DepositXrdTransactionJob, 'discriminator'>

export type DepositRewardTransactionJob = {
  type: 'DepositReward'
  questId: string
}

export type DepositHeroBadgeTransactionJob = {
  type: 'DepositHeroBadge'
  accountAddress: string
}

export type DepositXrdTransactionJob = {
  type: 'DepositXrd'
  accountAddress: string
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
  | DepositXrdTransactionJob
  | QuestCompletedTransactionJob
  | DepositGiftBoxesRewardTransactionJob
  | ElementsDepositedTransactionJob
  | DepositHeroBadgeTransactionJob
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

export type MintElementsSystemJob = {
  id: string
  type: (typeof SystemJobType)['MintElements']
  accountAddress: string
  userId: string
}

export type SystemJob =
  | RadmorphSystemJob
  | AddReferralSystemJob
  | MintElementsSystemJob
  | UpdateLettySwapDappDefinitionSystemJob
  | UpdateKycBadgeAddressSystemJob
  | PopulateResourcesSystemJob

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
  ),
  DepositQuestReward: createBufferQueue<DepositQuestRewardJob>(
    'DepositQuestReward',
    'discriminator',
    connection
  ),
  DepositHeroBadge: createBufferQueue<DepositHeroBadgeJob>(
    'DepositHeroBadge',
    'discriminator',
    connection
  ),
  CreateRadGems: createBufferQueue<CreateRadGemsJob>('CreateRadGems', 'discriminator', connection),
  DepositXrd: createBufferQueue<DepositXrdJob>('DepositXrd', 'discriminator', connection)
})

export type BufferQueues =
  | Queues['DepositGiftBoxReward']
  | Queues['DepositQuestReward']
  | Queues['DepositHeroBadge']
  | Queues['CreateRadGems']
  | Queues['DepositXrd']
