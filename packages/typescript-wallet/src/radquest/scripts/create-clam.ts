import { config } from '../../config'
import { createClamResource } from '../helpers/createClamResource'

createClamResource({
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress
})
