import { newGiftBoxOpenerV2 } from '../helpers/newGiftBoxOpenerV2'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { config } from '../../config'
import { logger } from '../../helpers'
import { registerGiftBoxes } from '../helpers/registerGiftBoxes'

const result: Record<string, string> = {}

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 1
})
  .andThen(() => newGiftBoxOpenerV2())
  .map((res) => Object.assign(result, res))
  .andThen(({ giftBoxOpenerV2 }) => registerGiftBoxes(giftBoxOpenerV2))
  .map((res) => logger.debug(res))
  .map(() => logger.debug(result))
  .mapErr((err) => logger.error(err, '\n\nDid you forget to rebuild the Scrypto package?\n'))
