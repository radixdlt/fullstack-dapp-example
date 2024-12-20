import { config } from '../../config'
import { createRadgem } from '../helpers/createRadgem'

createRadgem({
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress
})
