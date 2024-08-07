import { newGiftBoxOpenerV2 } from '../helpers/newGiftBoxOpenerV2'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { config } from '../../config'
import { logger } from '../../helpers'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 1
})
  .andThen(() => newGiftBoxOpenerV2())
  .mapErr((err) => logger.error(err, '\n\nDid you forget to rebuild the Scrypto package?\n'))
  .map((result) => logger.debug(result))
