import { describe, it, expect, beforeAll } from 'vitest'
import {
  RadixEngineClient,
  generateMnemonic,
  mintHeroBadge,
  mintElements,
  combineElementsDeposit,
  radquestEntityAddresses
} from 'typescript-wallet'
import { Addresses, GatewayApi, TransactionModel, appLogger } from 'common'
import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { Queues, getQueues } from 'queues'
import { config } from './config'
import { QueueEvents } from 'bullmq'
import crypto from 'crypto'

const eventQueueEvents = new QueueEvents(Queues.EventQueue, { connection: config.redis })
const transactionQueueEvents = new QueueEvents(Queues.TransactionQueue, {
  connection: config.redis
})

const { transactionQueue } = getQueues(config.redis)

const waitForQueueEvent = async (
  status: Parameters<(typeof eventQueueEvents)['on']>[0],
  queueEvents: QueueEvents,
  jobId: string
) =>
  new Promise<void>((resolve) => {
    queueEvents.on(status, async (data: any) => {
      if (jobId === data.jobId) return resolve(undefined)
    })
  })

const gatewayApi = GatewayApi(2)

const db = new PrismaClient()

const networkName = gatewayApi.networkConfig.networkName

const logger = appLogger

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

const transactionModel = TransactionModel(db)

const addresses = Addresses(2)

const createUser = async (
  identityAddress: string,
  accountAddress: string,
  id = crypto.randomUUID().replace(/-/g, '')
) =>
  db.user.create({
    data: { identityAddress, accountAddress, id, referralCode: crypto.randomUUID() }
  })

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
  it(
    'should add account address, track event, send notification to user, and mint hero badge',
    { timeout: 60_000, skip: false },
    async () => {
      const transactionKey = `AddAccountAddressToHeroBadgeForge:${crypto.randomUUID()}`
      const badgeId = `<${user.id}>`

      const badgeResourceAddress = addresses.badges.heroBadgeAddress
      const attempt = 0

      await transactionModel(logger).add({
        transactionKey,
        badgeId,
        badgeResourceAddress,
        attempt
      })

      const traceId = crypto.randomUUID()
      const jobId = `${traceId}:${attempt}`

      await transactionQueue.add({
        traceId,
        type: 'AddAccountAddressToHeroBadgeForge',
        attempt,
        badgeId,
        badgeResourceAddress,
        transactionKey,
        accountAddress: user.accountAddress!
      })

      await waitForQueueEvent('completed', transactionQueueEvents, jobId)

      const item = await db.transaction.findFirst({
        where: { attempt, transactionKey, badgeId, badgeResourceAddress }
      })

      expect(item?.status).toBe('COMPLETED')

      const messages = await db.message.findMany({
        where: { userId: user.id }
      })

      const message = messages.find(
        (message) => JSON.parse(message.data as any).type === 'HeroBadgeReadyToBeClaimed'
      )

      expect(message).toBeDefined()

      await radixEngineClient.getXrdFromFaucet()

      await radixEngineClient
        .getManifestBuilder()
        .andThen(({ convertStringManifest, submitTransaction }) => {
          const transactionManifest = `
          CALL_METHOD
              Address("${accountAddress}")
              "lock_fee"
              Decimal("50")
          ;
          CALL_METHOD
              Address("${addresses.components.heroBadgeForge}")
              "claim_badge"
              Address("${accountAddress}")
              "${user.id}"
          ;
          CALL_METHOD
              Address("${accountAddress}")
              "deposit_batch"
              Expression("ENTIRE_WORKTOP")
          ;
        `
          return convertStringManifest(transactionManifest)
            .andThen((transactionManifest) =>
              submitTransaction({ transactionManifest, signers: [] })
            )
            .andThen(({ txId }) => radixEngineClient.gatewayClient.pollTransactionStatus(txId))
        })

      const result = await gatewayApi.hasHeroBadge(accountAddress)

      if (result.isErr()) throw result.error

      expect(result.value).toBe(true)
    }
  )

  it('should deposit XRD to account', { timeout: 60_000, skip: false }, async () => {
    const transactionKey = `DepositXrdToAccount:${crypto.randomUUID()}`
    const badgeId = `<${user.id}>`

    const badgeResourceAddress = addresses.badges.heroBadgeAddress
    const attempt = 0

    await transactionModel(logger).add({
      transactionKey,
      badgeId,
      badgeResourceAddress,
      attempt
    })

    const traceId = crypto.randomUUID()
    const jobId = `${traceId}:${attempt}`

    await transactionQueue.add({
      traceId,
      type: 'DepositXrdToAccount',
      attempt,
      badgeId,
      badgeResourceAddress,
      transactionKey
    })

    await waitForQueueEvent('completed', transactionQueueEvents, jobId)

    const item = await db.transaction.findFirst({
      where: { attempt, transactionKey, badgeId, badgeResourceAddress }
    })

    expect(item?.status).toBe('COMPLETED')

    const result = await gatewayApi.callApi('getEntityDetailsVaultAggregated', [accountAddress])

    if (result.isErr()) throw result.error

    expect(
      result.value.some((item) =>
        item.fungible_resources.items.some((token) => token.resource_address === addresses.xrd)
      )
    ).toBe(true)
  })

  it('should mint elements and combine them', { timeout: 30_000, skip: false }, async () => {
    await radixEngineClient.getXrdFromFaucet()

    await mintHeroBadge(user.id, accountAddress, undefined, [], 0, {
      heroBadgeAddress: radquestEntityAddresses.badges.heroBadgeAddress
    })

    await mintElements(10, accountAddress)

    await combineElementsDeposit({
      accountAddress,
      badgeAddress: radquestEntityAddresses.badges.heroBadgeAddress,
      badgeLocalId: `<${user.id}>`,
      radixEngineClient: radixEngineClient as RadixEngineClient
    })
      .map((txId) => {
        console.log({ txId })
      })
      .mapErr((error) => {
        console.log({ error })
      })
  })
})
