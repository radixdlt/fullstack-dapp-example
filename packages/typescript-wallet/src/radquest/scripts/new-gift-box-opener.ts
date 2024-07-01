import { Addresses } from 'common'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newGiftBoxOpener } from '../helpers/newGiftBoxOpener'
import { logger } from '../../helpers'

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress,
  amount: 1
}).map(() =>
  newGiftBoxOpener()
    .mapErr((err) => logger.error(err))
    .map(({ giftBoxOpenerAddress }) => logger.debug({ giftBoxOpenerAddress }))
)
