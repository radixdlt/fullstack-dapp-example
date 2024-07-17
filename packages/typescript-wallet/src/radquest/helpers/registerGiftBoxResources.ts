import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const registerGiftBoxResources = (giftBoxOpener: string) => {
  const giftBoxResourcesAddresses = Object.values(config.radQuest.resources.giftBox)
    .map((item) => `Address("${item}")`)
    .join(', ')

  const transactionManifest = `
CALL_METHOD
    Address("${config.radQuest.accounts.system.address}")
    "create_proof_of_amount"
    Address("${config.radQuest.badges.adminBadgeAddress}")
    Decimal("1")
;
CALL_METHOD
    Address("${giftBoxOpener}")
    "add_gift_box_resources"
    Array<Address>(${giftBoxResourcesAddresses})
;
`
  return transactionBuilder({ transactionManifest, signers: ['system'] })
    .submit()
    .map(({ transactionId }) => transactionId)
}
