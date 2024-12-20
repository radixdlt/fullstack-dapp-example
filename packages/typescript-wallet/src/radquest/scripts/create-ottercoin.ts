import { config } from '../../config'
import { createOttercoin } from '../helpers/createOttercoin'

createOttercoin({
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress
})
