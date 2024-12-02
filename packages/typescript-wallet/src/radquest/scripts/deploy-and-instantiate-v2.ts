import { config } from '../../config'
import { deployCardForgeV2Package } from '../../card-forge-v2/helpers/deployCardForgeV2Package'
import { deployGiftBoxOpenerV2Package } from '../../gift-box-opener-v2/helpers/deployGiftBoxOpenerV2Package'
import { deployHeroBadgeForgeV2Package } from '../../hero-badge-forge-v2/helpers/deployHeroBadgeForgeV2Package'
import { deployQuestRewardsV2Package } from '../../quest-rewards-v2/helpers/deployQuestRewardsV2Package'
import { deployRadgemForgeV2Package } from '../../radgem-forge-v2/helpers/deployRadgemForgeV2Package'
import { logger } from '../../helpers'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newCardForgeV2 } from '../../card-forge-v2/helpers/newCardForgeV2'
import { newGiftBoxOpenerV2 } from '../../gift-box-opener-v2/helpers/newGiftBoxOpenerV2'
import { newHeroBadgeForgeV2 } from '../../hero-badge-forge-v2/helpers/newHeroBadgeForgeV2'
import { newQuestRewardsV2 } from '../../quest-rewards-v2/helpers/newQuestRewardsV2'
import { newRadgemForgeV2 } from '../../radgem-forge-v2/helpers/newRadgemForgeV2'
import { setGiftBoxAddresses } from '../../gift-box-opener-v2/helpers/setGiftBoxAddresses'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 5
})
  .map(() => logger.debug('Admin Badges minted'))
  .andThen(() => deployHeroBadgeForgeV2Package({}))
  .andThen((addresses) =>
    newHeroBadgeForgeV2(addresses.heroBadgeForgeV2Package)
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('HeroBadgeForgeV2 instantiated'))
      .map(() => addresses)
  )
  .andThen((addresses) => deployQuestRewardsV2Package(addresses))
  .andThen((addresses) =>
    newQuestRewardsV2(addresses.questRewardsV2Package)
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('QuestRewardsV2 instantiated'))
      .map(() => addresses)
  )
  .andThen((addresses) =>
    deployCardForgeV2Package(addresses)
      .andThen((addresses) => newCardForgeV2(addresses.cardForgeV2Package))
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('CardForgeV2 instantiated'))
      .map(() => addresses)
  )
  .andThen((addresses) => deployGiftBoxOpenerV2Package(addresses))
  .andThen((addresses) =>
    newGiftBoxOpenerV2(addresses.giftBoxOpenerV2Package)
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('GiftBoxOpenerV2 instantiated'))
      .andThen(() => setGiftBoxAddresses(addresses.giftBoxOpenerV2))
      .map(() => logger.debug('GiftBox addresses set'))
      .map(() => addresses)
  )
  .andThen((addresses) => deployRadgemForgeV2Package(addresses))
  .andThen((addresses) =>
    newRadgemForgeV2(addresses.radgemForgeV2Package)
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('RadgemForgeV2 component instantiated'))
      .map(() => addresses)
  )
  .map((addresses) => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
