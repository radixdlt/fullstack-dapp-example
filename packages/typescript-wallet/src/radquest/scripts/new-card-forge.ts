import { newCardForge } from '../helpers/newCardForge'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { config } from '../../config'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress
}).then(() => {
  newCardForge()
})
