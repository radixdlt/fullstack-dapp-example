import { QuestDefinitions, QuestId } from 'content'
import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { describe, it, expect, beforeAll } from 'vitest'
import { RadixEngineClient, generateMnemonic } from 'typescript-wallet'
import { GatewayApi, ReferralQuestConfig, appLogger } from 'common'
import { PrismaClient, User } from 'database'
import { ResultAsync } from 'neverthrow'
import { getQueues } from 'queues'
import { config } from './config'
import crypto from 'crypto'
import { createUser } from './helpers/create-user'
import { createRewardClaimedEvent } from './helpers/create-reward-claimed-event'
import { completeQuestRequirements } from './helpers/complete-quest-requirements'
import { waitForMessage } from './helpers/wait-for-message'

const { eventQueue } = getQueues(config.redis)

const gatewayApi = GatewayApi(2)
const db = new PrismaClient()
const logger = appLogger
const referralCode = '6P6W4S'
const networkName = gatewayApi.networkConfig.networkName

if (!networkName) throw new Error('PUBLIC_NETWORK_ID env var not set to a valid network')

const radixEngineClient = RadixEngineClient({
  accounts: { testAccount: 1 },
  gatewayApi,
  mnemonic: generateMnemonic()
})

let accountAddress: string
let identityAddress: string
let user: User

const requiredQuestRequirements = Object.keys(
  QuestDefinitions()[ReferralQuestConfig.triggerRewardAfterQuest as QuestId].requirements
)

describe('Referral Quest', () => {
  beforeAll(async () => {
    const result = await ResultAsync.combine([
      radixEngineClient.getAccounts(),
      radixEngineClient.getIdentityAddressAtDerivationIndex(0)
    ])

    if (result.isErr()) throw result.error
    const value = result.value
    accountAddress = value[0].testAccount
    identityAddress = value[1]
    user = await createUser(db)(identityAddress, accountAddress, referralCode)

    await completeQuestRequirements(db)(
      user.id,
      ReferralQuestConfig.triggerRewardAfterQuest,
      requiredQuestRequirements
    )
  })

  it('should pick up event', async () => {
    const transactionId = crypto.randomUUID()
    await db.event.create({
      data: {
        transactionId,
        id: transactionId
      }
    })
    eventQueue.addJob({
      type: 'QuestRewardClaimed',
      traceId: 'integration-test-trace-id',
      transactionId,
      relevantEvents: {
        RewardClaimedEvent: createRewardClaimedEvent(
          user.id,
          ReferralQuestConfig.triggerRewardAfterQuest
        ) as EventsItem
      }
    })
    await waitForMessage(logger, db)(user.id, 'QuestRewardsClaimed')
    expect(true).toBe(true)
  })
})
