import { config } from '$lib/config'
import type { WellKnownAddresses } from 'common'

export const createDirectDepositManifest = ({
  wellKnownAddresses,
  userId,
  accountAddress
}: {
  wellKnownAddresses: WellKnownAddresses
  userId: string
  accountAddress: string
}) => {
  const { userBadgeAddress, adminBadgeAddress } = config.dapp.badges
  const directXrdDepositAmount = config.dapp.directXrdDepositAmount
  return `
    CALL_METHOD 
      Address("${wellKnownAddresses.accountAddress.payerAccount}") 
      "lock_fee"
      Decimal("10");

    CALL_METHOD
      Address("${wellKnownAddresses.accountAddress.systemAccount}")
      "create_proof_of_amount"
      Address("${adminBadgeAddress}")
      Decimal("1");

    MINT_NON_FUNGIBLE
      Address("${userBadgeAddress}")
      Map<NonFungibleLocalId, Tuple>(NonFungibleLocalId("<${userId}>") => Tuple(Tuple()));

    CALL_METHOD
      Address("${wellKnownAddresses.accountAddress.payerAccount}")
      "withdraw"
      Address("${wellKnownAddresses.resourceAddresses.xrd}")
      Decimal("${directXrdDepositAmount}");

      CALL_METHOD
      Address("${accountAddress}")
      "try_deposit_batch_or_abort"
      Expression("ENTIRE_WORKTOP")
      Enum<0u8>();
`
}
