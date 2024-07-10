import { config } from '../../config'
import { createOtterCoin } from '../helpers/createOtterCoin'

createOtterCoin({
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress
})
