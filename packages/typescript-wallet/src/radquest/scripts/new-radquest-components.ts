import { Addresses } from 'common'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newHeroBadgeForge } from '../helpers/newHeroBadgeForge'
import { newQuestRewards } from '../helpers/newQuestRewards'
import { newGiftBoxOpener } from '../helpers/newGiftBoxOpener'
import { newRefinery } from '../helpers/newRefinery'
import { newCardForge } from '../helpers/newCardForge'
import { addCardForgeCards } from '../helpers/addCardForeCards'
import { logger } from '../../helpers'

let result = {
  heroBadgeForge: '',
  kycOracle: '',
  questRewards: '',
  giftBoxOpener: '',
  cardForge: '',
  radgemForge: '',
  radmorphForge: '',
  imageOracle: '',
  refinery: ''
}

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
  .mapErr((err) => logger.error(err))
  .map(() =>
    logger.debug(
      '\nNew component addresses:',
      result,
      "\n\n Don't forget to get the kycOracleKeyValueStore from the Dashboard!"
    )
  )
