import { WellKnownAddresses } from 'common'
import { config } from '../../config'

export const createCombinedElementsAddRadgemImageManifest = ({
  wellKnownAddresses,
  userId,
  radgemId,
  keyImageUrl
}: {
  wellKnownAddresses: WellKnownAddresses
  userId: string
  radgemId: string
  keyImageUrl: string
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
  "combine_elements_add_radgem_image"
  "${userId}"
  NonFungibleLocalId("${radgemId}")
  "${keyImageUrl}"
;
`
}
