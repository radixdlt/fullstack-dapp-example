import { WellKnownAddresses } from 'common'
import { config } from '../../config'
import { randomFloat } from '../../helpers/randomFloat'

export const createCombinedElementsMintRadgemManifest = ({
  wellKnownAddresses,
  badgeResourceAddress,
  badgeId
}: {
  wellKnownAddresses: WellKnownAddresses
  badgeResourceAddress: string
  badgeId: string
}) => {
  const { adminBadgeAddress } = config.radQuest.badges
  const { refinery } = config.radQuest.components

  return `
CALL_METHOD
  Address("${wellKnownAddresses.accountAddress.payerAccount}")
  "lock_fee"
  Decimal("50")
;

CALL_METHOD
  Address("${wellKnownAddresses.accountAddress.systemAccount}")
  "create_proof_of_amount"
  Address("${adminBadgeAddress}")
  Decimal("1")
;

CALL_METHOD
  Address("${refinery}")
  "combine_elements_mint_radgem"
  NonFungibleGlobalId("${badgeResourceAddress}:${badgeId}")
  Decimal("${randomFloat()}")
  Decimal("${randomFloat()}")
;
`
}
