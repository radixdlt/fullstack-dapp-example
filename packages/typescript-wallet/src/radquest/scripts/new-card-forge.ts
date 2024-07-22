import { newCardForge } from '../helpers/newCardForge'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { logger } from '../../helpers'
import { config } from '../../config'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress
})
  .andThen(() => newCardForge())
  .map((cardForgeAddress) => logger.debug(cardForgeAddress))
