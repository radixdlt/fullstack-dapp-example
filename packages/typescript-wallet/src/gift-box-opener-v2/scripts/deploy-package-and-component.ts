import { config } from '../../config'
import { logger } from '../../helpers'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { deployGiftBoxOpenerV2Package } from '../helpers/deployGiftBoxOpenerV2Package'
import { newGiftBoxOpenerV2 } from '../helpers/newGiftBoxOpenerV2'
import { setGiftBoxAddresses } from '../helpers/setGiftBoxAddresses'

deployGiftBoxOpenerV2Package({})
  .andThen((addresses) =>
    mintAdminBadge({
      adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
      superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
      amount: 1
    })
      .map(() => logger.debug('Admin Badge minted'))
      .andThen(() => newGiftBoxOpenerV2(addresses.giftBoxOpenerV2Package))
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('GiftBoxOpenerV2 instantiated'))
      .andThen(() => setGiftBoxAddresses(addresses.giftBoxOpenerV2))
      .map(() => logger.debug('GiftBox addresses set'))
  )
  .map((addresses) => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
