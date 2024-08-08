import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const registerGiftBoxes = (giftBoxOpenerV2?: string) => {
  const transactionManifest = `
CALL_METHOD
    Address("${config.radQuest.accounts.system.address}")
    "create_proof_of_amount"
    Address("${config.radQuest.badges.adminBadgeAddress}")
    Decimal("1")
;
CALL_METHOD
    Address("${giftBoxOpenerV2 ?? config.radQuest.components.giftBoxOpenerV2}")
    "add_gift_box_resources"
    Array<Address>(
        Address("${config.radQuest.resources.giftBox.Starter}"),
        Address("${config.radQuest.resources.giftBox.Simple}"),
        Address("${config.radQuest.resources.giftBox.Fancy}"),
        Address("${config.radQuest.resources.giftBox.Elite}")
    )
;
`
  const transaction = transactionBuilder({
    transactionManifest,
    signers: ['owner', 'system']
  })
  return transaction.submit()
}
