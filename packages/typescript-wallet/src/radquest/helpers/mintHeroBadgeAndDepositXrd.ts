import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const mintHeroBadgeAndDepositXrd = (
  userId: string,
  accountAddress: string,
  keyImageUrl = '""',
  questsCompleted: string[] = [],
  questCounter = 0,
  badgeAddresses?: Partial<{
    heroBadgeAddress: string
    adminBadgeAddress: string
  }>
) => {
  const {
    heroBadgeAddress = config.radQuest.badges.heroBadgeAddress,
    adminBadgeAddress = config.radQuest.badges.adminBadgeAddress
  } = badgeAddresses ?? {}

  const transactionManifest = `
CALL_METHOD
  Address("${config.radQuest.accounts.system.address}")
  "create_proof_of_amount"
  Address("${adminBadgeAddress}")
  Decimal("1")
;
  
MINT_NON_FUNGIBLE
  Address("${heroBadgeAddress}")
  Map<NonFungibleLocalId, Tuple>(NonFungibleLocalId("<${userId}>") => Tuple(Tuple(
    ${keyImageUrl},
    Array<String>(${questsCompleted.join(', ')}),
    ${questCounter}u32,
  )))
;

CALL_METHOD
  Address("${config.radQuest.accounts.payer.address}")
  "withdraw"
  Address("${config.radQuest.xrd}")
  Decimal("${config.directXrdDepositAmount}");

CALL_METHOD
  Address("${accountAddress}")
  "try_deposit_batch_or_abort"
  Expression("ENTIRE_WORKTOP")
  Enum<0u8>()
;`
  return transactionBuilder({ transactionManifest, signers: ['system'] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
