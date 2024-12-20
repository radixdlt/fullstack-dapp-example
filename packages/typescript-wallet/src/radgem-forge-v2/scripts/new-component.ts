import { newRadgemForgeV2 } from '../helpers/newRadgemForgeV2'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { config } from '../../config'
import { logger } from '../../helpers'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 1
})
  .andThen(() => newRadgemForgeV2())
  .mapErr((err) => logger.error(err, '\n\nDid you forget to rebuild the Scrypto package?\n'))
  .map((result) => logger.debug(result))
