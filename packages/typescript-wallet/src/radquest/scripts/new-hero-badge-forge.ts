import { newHeroBadgeForge } from '../helpers/newHeroBadgeForge'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { logger } from '../../helpers'
import { config } from '../../config'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 1
}).then(() =>
  newHeroBadgeForge().map(({ heroBadgeForgeAddress }) => logger.debug({ heroBadgeForgeAddress }))
)
