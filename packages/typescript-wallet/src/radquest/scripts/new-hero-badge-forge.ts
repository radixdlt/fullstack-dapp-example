import { newHeroBadgeForge } from '../helpers/newHeroBadgeForge'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { Addresses } from 'common'
import { logger } from '../../helpers'

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress,
  amount: 1
}).then(() =>
  newHeroBadgeForge().map(({ heroBadgeForgeAddress }) => logger.debug({ heroBadgeForgeAddress }))
)
