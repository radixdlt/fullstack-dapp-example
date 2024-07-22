import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newGiftBoxOpener } from '../helpers/newGiftBoxOpener'
import { logger } from '../../helpers'
import { config } from '../../config'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 1
}).map(() =>
  newGiftBoxOpener()
    .mapErr((err) => logger.error(err))
    .map(({ giftBoxOpenerAddress }) => logger.debug({ giftBoxOpenerAddress }))
)
