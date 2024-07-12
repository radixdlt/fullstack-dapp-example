import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const mintAdminBadge = ({
  adminBadgeAddress,
  accountAddress,
  superAdminBadgeAddress,
  amount = 1
}: {
  superAdminBadgeAddress: string
  accountAddress?: string
  adminBadgeAddress: string
  amount?: number
}) => {
  const transactionManifest = `
        CALL_METHOD 
          Address("${config.radQuest.accounts.payer.address}") 
          "lock_fee"
          Decimal("10")
        ;

        CALL_METHOD
          Address("${config.radQuest.accounts.owner.address}")
          "create_proof_of_amount"
          Address("${superAdminBadgeAddress}")
          Decimal("1")
        ;

        MINT_FUNGIBLE 
          Address("${adminBadgeAddress}")
          Decimal("${amount}")
        ;

        CALL_METHOD
          Address("${accountAddress ?? config.radQuest.accounts.system.address}")
          "try_deposit_batch_or_abort"
          Expression("ENTIRE_WORKTOP")
          Enum<0u8>()
        ;
        `
  return transactionBuilder({ transactionManifest, signers: ['payer', 'owner', 'system'] }).submit()
}
