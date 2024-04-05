import { createCardForge } from '../helpers/createCardForge'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { config } from '../../config'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress
}).then(() => {
  createCardForge()
})
