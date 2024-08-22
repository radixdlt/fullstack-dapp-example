import { newHeroBadgeForgeV2 } from '../helpers/newHeroBadgeForgeV2.ts'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { config } from '../../config'
import { logger } from '../../helpers'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 1
})
  .andThen(() => newHeroBadgeForgeV2())
  .mapErr((err) => logger.error(err, '\n\nDid you forget to rebuild the Scrypto package?'))
  .map((result) => logger.debug(result))
