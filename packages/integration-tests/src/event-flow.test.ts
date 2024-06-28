import { describe, it, expect, beforeAll } from 'vitest'
import {
  RadixEngineClient,
  generateMnemonic,
  mintHeroBadge,
  mintElements,
  combineElementsDeposit,
  radquestEntityAddresses
} from 'typescript-wallet'
import { Addresses, GatewayApi, TransactionModel, UserQuestModel, appLogger } from 'common'
import { PrismaClient, User } from 'database'
import { ResultAsync } from 'neverthrow'
import { Queues, getQueues } from 'queues'
import { config } from './config'
import { QueueEvents } from 'bullmq'
import crypto from 'crypto'
import { createUser } from './helpers/create-user'
import { addVerifiedPhoneNumberRequirement } from './helpers/add-completed-requirement'
import { completeQuestRequirements } from './helpers/complete-quest-requirements'
import { waitForMessage } from './helpers/wait-for-message'

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
let user: User
let queues: ReturnType<typeof getQueues>

const transactionModel = TransactionModel(db, transactionQueue)
const userQuestModel = UserQuestModel(db)(logger)

const addresses = Addresses(2)

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
    user = await createUser(db)(identityAddress, accountAddress)
    await addVerifiedPhoneNumberRequirement(db)(user.id)
    queues = getQueues(config.redis)
  })
  it(
    'should add account address, track event, send notification to user, and mint hero badge',
    { timeout: 60_000, skip: false },
    async () => {
      const discriminator = `AddAccountAddressToHeroBadgeForge:${crypto.randomUUID()}`

      await completeQuestRequirements(db)(user.id, 'FirstTransactionQuest', [
        'VerifyPhoneNumber',
        'RegisterAccount',
        'LearnAboutTransactions'
      ])

      await transactionModel(logger).add({
        userId: user.id,
        discriminator,
        type: 'AddAccountAddressToHeroBadgeForge',
        traceId: crypto.randomUUID(),
        accountAddress: user.accountAddress!
      })

      await waitForQueueEvent('completed', transactionQueueEvents, discriminator)

      const item = await db.transactionIntent.findFirst({
        where: { discriminator }
      })

      expect(item?.status).toBe('COMPLETED')

      await waitForMessage(logger, db)(user.id, 'HeroBadgeReadyToBeClaimed')

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
    const discriminator = `DepositXrdToAccount:${crypto.randomUUID()}`

    const traceId = crypto.randomUUID()

    await transactionModel(logger).add({
      discriminator,
      userId: user.id,
      type: 'DepositXrdToAccount',
      traceId
    })

    await waitForQueueEvent('completed', transactionQueueEvents, discriminator)

    const item = await db.transactionIntent.findFirst({
      where: { discriminator }
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
