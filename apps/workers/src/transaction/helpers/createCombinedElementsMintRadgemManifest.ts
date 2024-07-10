import { config } from '../../config'
import { randomFloat } from '../../helpers/randomFloat'

export const createCombinedElementsMintRadgemManifest = ({ userId }: { userId: string }) => {
  const { adminBadgeAddress } = config.radQuest.badges
  const { refinery } = config.radQuest.components
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
  Decimal("50")
;

CALL_METHOD
  Address("${system.address}")
  "create_proof_of_amount"
  Address("${adminBadgeAddress}")
  Decimal("1")
;

CALL_METHOD
  Address("${refinery}")
  "combine_elements_mint_radgem"
  "${userId}"
  Decimal("${randomFloat()}")
  Decimal("${randomFloat()}")
;
`
}
