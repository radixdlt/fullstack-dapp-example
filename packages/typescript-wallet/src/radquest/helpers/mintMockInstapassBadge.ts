import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const mintMockInstapassBadge = (accountAddress: string) => {
  const adminBadgeAddress = config.radQuest.badges.adminBadgeAddress

  const transactionManifest = `
        CALL_METHOD 
          Address("${config.radQuest.accounts.payer.address}") 
          "lock_fee"
          Decimal("10")
        ;

        CALL_METHOD
          Address("${config.radQuest.accounts.system.address}")
          "create_proof_of_amount"
          Address("${adminBadgeAddress}")
          Decimal("1")
        ;
          
        MINT_NON_FUNGIBLE
          Address("${config.radQuest.badges.instapassBadgeAddress}")
          Map<NonFungibleLocalId, Tuple>(NonFungibleLocalId("<${crypto.randomUUID().replace(/-/g, '')}>") => Tuple(Tuple()))
        ;

        CALL_METHOD
          Address("${accountAddress}")
          "try_deposit_batch_or_abort"
          Expression("ENTIRE_WORKTOP")
          Enum<0u8>()
        ;`
  return transactionBuilder({ transactionManifest, signers: ['payer', 'system'] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
