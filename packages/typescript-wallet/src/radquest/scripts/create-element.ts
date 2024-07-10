import { config } from '../../config'
import { createElementResource } from '../helpers/createElementResource'

createElementResource({
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress
})
