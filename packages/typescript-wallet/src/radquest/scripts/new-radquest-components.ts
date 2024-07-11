import { Addresses } from 'common'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newHeroBadgeForge } from '../helpers/newHeroBadgeForge'
import { newQuestRewards } from '../helpers/newQuestRewards'
import { newGiftBoxOpener } from '../helpers/newGiftBoxOpener'
import { newRefinery } from '../helpers/newRefinery'
import { newCardForge } from '../helpers/newCardForge'
import { logger } from '../../helpers'
import { registerGiftBoxResources } from '../helpers/registerGiftBoxResources'

let result: Record<string, string> = {}

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress,
  amount: 7
})
  .andThen(() => newHeroBadgeForge())
  .map(({ heroBadgeForgeAddress }) => {
    result.heroBadgeForge = heroBadgeForgeAddress
  })
  .andThen(() => newQuestRewards())
  .map(({ kycOracleAddress, questRewardsAddress }) => {
    result.kycOracle = kycOracleAddress
    result.questRewards = questRewardsAddress
  })
  .andThen(() => newGiftBoxOpener())
  .map(({ giftBoxOpenerAddress }) => {
    result.giftBoxOpener = giftBoxOpenerAddress
  })
  .andThen(() => registerGiftBoxResources(result.giftBoxOpener))
  .andThen(() => newCardForge())
  .map(({ cardForgeAddress }) => {
    result.cardForge = cardForgeAddress
    return cardForgeAddress
  })
  .andThen(() => newRefinery())
  .map(({ radgemForgeAddress, radmorphForgeAddress, imageOracleAddress, refineryAddress }) => {
    result.radgemForge = radgemForgeAddress
    result.radmorphForge = radmorphForgeAddress
    result.imageOracle = imageOracleAddress
    result.refinery = refineryAddress
  })
  .mapErr((err) => logger.error(err, '\n\nDid you forget to rebuild the Scrypto package?'))
  .map(() =>
    logger.debug(
      '\nNew RadQuest component addresses:',
      result,
      `\n\nDon't forget to get the kycOracleKeyValueStore from the Dashboard!

You can find it here:
https://stokenet-dashboard.radixdlt.com/component/${result.kycOracle}/state`
    )
  )
