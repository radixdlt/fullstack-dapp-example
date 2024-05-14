import { describe, it, expect, beforeAll } from 'vitest'
import {
  RadixEngineClient,
  generateMnemonic,
  radQuestEntityAddresses,
  mintUserBadgeAndDepositXrd,
  mintUserBadge,
  mintElements,
  combineElementsDeposit
} from 'typescript-wallet'
import { GatewayApi } from 'common'
import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { EventJob, Queues, getQueues } from 'queues'
import { config } from './config'
import { QueueEvents } from 'bullmq'
import crypto from 'crypto'

const eventQueueEvents = new QueueEvents(Queues.EventQueue, { connection: config.redis })

const waitForQueueEvent = async (status: Parameters<(typeof eventQueueEvents)['on']>[0]) =>
  new Promise<EventJob>((resolve) => {
    eventQueueEvents.on(status, async ({ jobId }: { jobId: string }) => {
      const jobData = (await queues.eventQueue.queue.getJob(jobId))?.data
      return resolve(jobData!)
    })
  })

const gatewayApi = GatewayApi(2)

const db = new PrismaClient()

const networkName = gatewayApi.networkConfig.networkName

if (!networkName) throw new Error('PUBLIC_NETWORK_ID env var not set to a valid network')

const radixEngineClient = RadixEngineClient({
  accounts: { testAccount: 1 },
  gatewayApi,
  mnemonic: generateMnemonic()
})

let accountAddress: string
let identityAddress: string
let user: Awaited<ReturnType<typeof createUser>>
let queues: ReturnType<typeof getQueues>

const createUser = async (
  identityAddress: string,
  accountAddress: string,
  id = crypto.randomUUID().replace(/-/g, '')
) => db.user.create({ data: { identityAddress, accountAddress, id } })

const addVerifiedPhoneNumberRequirement = async (userId: string) =>
  db.completedQuestRequirement.create({
    data: { userId, questId: 'FirstTransactionQuest', requirementId: 'VerifyPhoneNumber' }
  })

describe('Event flows', () => {
  beforeAll(async () => {
    const result = await ResultAsync.combine([
      radixEngineClient.getAccounts(),
      radixEngineClient.getIdentityAddressAtDerivationIndex(0)
    ])
    if (result.isErr()) throw result.error
    const value = result.value
    accountAddress = value[0].testAccount
    identityAddress = value[1]
    user = await createUser(identityAddress, accountAddress)
    await addVerifiedPhoneNumberRequirement(user.id)
    queues = getQueues(config.redis)
  })
  it.skip(
    'should mint user badge, create event, and send notification',
    { timeout: 30_000, skip: true },
    async () => {
      const [jobData, mintUserBadgeResult] = await Promise.all([
        waitForQueueEvent('completed'),
        mintUserBadgeAndDepositXrd(user.id, accountAddress)
      ])

      if (mintUserBadgeResult.isErr()) throw mintUserBadgeResult.error

      const transactionId = mintUserBadgeResult.value

      const event = await db.event.findFirst({
        where: { userId: user.id, id: jobData.type, transactionId }
      })
      const notification = await db.notification.findFirst({ where: { userId: user.id } })
      const completedRequirements = await db.completedQuestRequirement.findMany({
        where: { userId: user.id, questId: 'FirstTransactionQuest' }
      })

      expect(event?.questId).toBe('FirstTransactionQuest')
      expect(event?.userId).toBe(user.id)
      expect(event?.id).toBe('UserBadge')
      expect(event?.transactionId).toBe(transactionId)
      expect(completedRequirements.length).toBe(2)
      expect(notification?.data).toEqual({
        type: 'QuestRequirementCompleted',
        questId: 'FirstTransactionQuest',
        requirementId: 'DepositUserBadge'
      })
    }
  )
  it('should mint elements and combine them', { timeout: 30_000 }, async () => {
    await radixEngineClient.getXrdFromFaucet()

    await mintUserBadge(user.id, accountAddress, {
      userBadgeAddress: radQuestEntityAddresses.badges.userBadgeAddress
    })
    await mintElements(10, accountAddress)

    await combineElementsDeposit({
      accountAddress,
      badgeAddress: radQuestEntityAddresses.badges.userBadgeAddress,
      badgeLocalId: `<${user.id}>`,
      radixEngineClient: radixEngineClient as RadixEngineClient
    })
  })
})
