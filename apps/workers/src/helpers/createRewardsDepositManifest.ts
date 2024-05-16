import { Addresses } from 'common'
import { QuestReward } from 'content'
import { config } from '../config'
import { getRandomValues } from 'node:crypto'

const randomFloat = () => {
  const typedArray = new Uint32Array(1)
  const randomValue = getRandomValues(typedArray)[0]
  const randomFloat = randomValue / Math.pow(2, 32)
  return randomFloat
}

export const createRewardsDepositManifest = ({
  wellKnownAddresses,
  questId,
  userId,
  rewards
}: {
  rewards: readonly QuestReward[]
  questId: string
  userId: string
  wellKnownAddresses: {
    accountAddress: {
      payerAccount: string
      systemAccount: string
    }
  }
}) => {
  const addresses = Addresses(config.networkId)
  const buckets: string[] = []
  const manifest = [
    `
              CALL_METHOD
                Address("${wellKnownAddresses.accountAddress.payerAccount}")
                "lock_fee"
                Decimal("100")
              ;

              CALL_METHOD
              Address("${wellKnownAddresses.accountAddress.systemAccount}")
              "create_proof_of_amount"
              Address("${addresses.badges.adminBadgeAddress}") 
              Decimal("1");  
            `,
    rewards
      .map((reward) => {
        const bucketName = `bucket${buckets.length + 1}`
        buckets.push(bucketName)

        if (reward.name === 'element') {
          return `
                  MINT_FUNGIBLE
                    Address("${addresses.resources.elementAddress}")
                    Decimal("${reward.amount}");
                    
                  TAKE_FROM_WORKTOP
                    Address("${addresses.resources.elementAddress}")
                    Decimal("${reward.amount}")
                    Bucket("${bucketName}")
                  ;`
        }

        if (reward.name === 'clam') {
          return `          
                  MINT_FUNGIBLE
                    Address("${addresses.resources.clamAddress}")
                    Decimal("${reward.amount}");
                    
                  TAKE_FROM_WORKTOP
                    Address("${addresses.resources.clamAddress}")
                    Decimal("${reward.amount}")
                    Bucket("${bucketName}")
                  ;`
        }

        if (reward.name === 'energyCard') {
          return `          
          CALL_METHOD
              Address("${config.radQuest.components.cardForge}")
              "mint_random_card"
              Decimal("${randomFloat()}")
              "${userId}"
          ;

          TAKE_ALL_FROM_WORKTOP
              Address("${config.radQuest.resources.morphEnergyCards}")
              Bucket("${bucketName}")
          ;
          `
        }
        return undefined
      })
      .join('\n'),
    `
              CALL_METHOD
                Address("${wellKnownAddresses.accountAddress.systemAccount}")
                "create_proof_of_amount"
                Address("${addresses.badges.adminBadgeAddress}")
                Decimal("1");          

              CALL_METHOD
                Address("${addresses.components.questRewards}")
                "deposit_reward"
                "<${userId}>"
                "${questId}"
                # Array of Buckets to deposit
                Array<Bucket>(${buckets.map((bucket) => `Bucket("${bucket}")`).join(',')})
            ;
            `
  ]
    .filter(Boolean)
    .join('\n')

  return manifest
}
