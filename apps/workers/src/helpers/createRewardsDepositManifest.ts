import { Addresses } from 'common'
import { QuestReward } from 'content'
import { config } from '../config'

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

            `,
    rewards.map((reward) => {
      const bucketName = `bucket${buckets.length + 1}`
      buckets.push(bucketName)

      let createProof = `
        CALL_METHOD
          Address("${wellKnownAddresses.accountAddress.systemAccount}")
          "create_proof_of_amount"
          Address("${addresses.badges.adminBadgeAddress}") 
          Decimal("1");  
       `
      if (reward.name === 'element') {
        return (
          createProof +
          `
                  MINT_FUNGIBLE
                    Address("${addresses.resources.elementAddress}")
                    Decimal("${reward.amount}");
                    
                  TAKE_FROM_WORKTOP
                    Address("${addresses.resources.elementAddress}")
                    Decimal("${reward.amount}")
                    Bucket("${bucketName}")
                  ;`
        )
      }

      if (reward.name === 'clam') {
        return (
          createProof +
          `          
                  MINT_FUNGIBLE
                    Address("${addresses.resources.clamAddress}")
                    Decimal("${reward.amount}");
                    
                  TAKE_FROM_WORKTOP
                    Address("${addresses.resources.clamAddress}")
                    Decimal("${reward.amount}")
                    Bucket("${bucketName}")
                  ;`
        )
      }
      return undefined
    }),
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
