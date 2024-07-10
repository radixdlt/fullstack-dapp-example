import { config } from '../../config'
import { createRadmorph } from '../helpers/createRadmorph'

createRadmorph({
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress
})
