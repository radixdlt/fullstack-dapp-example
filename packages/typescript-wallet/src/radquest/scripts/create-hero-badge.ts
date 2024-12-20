import { config } from '../../config'
import { logger } from '../../helpers/logger'
import { createHeroBadgeResource } from '../helpers/createHeroBadgeResource'

createHeroBadgeResource({
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress
}).map((result) => logger.debug(result))
