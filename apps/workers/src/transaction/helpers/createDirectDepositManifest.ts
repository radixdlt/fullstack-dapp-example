import { config } from '../../config'

export const createDirectDepositManifest = ({
  userId,
  accountAddress
}: {
  userId: string
  accountAddress: string
}) => {
  const { heroBadgeAddress, adminBadgeAddress } = config.radQuest.badges
  const directXrdDepositAmount = config.radQuest.directXrdDepositAmount
  const { payer, system } = config.radQuest.accounts

  return `
    CALL_METHOD
      Address("${payer.accessController}")
      "create_proof"
    ;

    CALL_METHOD
      Address("${system.accessController}")
      "create_proof"
    ;
    CALL_METHOD 
      Address("${payer.address}") 
      "lock_fee"
      Decimal("10");

    CALL_METHOD
      Address("${system.address}")
      "create_proof_of_amount"
      Address("${adminBadgeAddress}")
      Decimal("1");

    MINT_NON_FUNGIBLE
      Address("${heroBadgeAddress}")
      Map<NonFungibleLocalId, Tuple>(NonFungibleLocalId("<${userId}>") => Tuple(Tuple()));

    CALL_METHOD
      Address("${payer.address}")
      "withdraw"
      Address("${config.radQuest.xrd}")
      Decimal("${directXrdDepositAmount}");

    CALL_METHOD
      Address("${accountAddress}")
      "try_deposit_batch_or_abort"
      Expression("ENTIRE_WORKTOP")
      Enum<0u8>();
`
}
