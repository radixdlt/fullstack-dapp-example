import { config } from '../../config'
import { createEnergyCard } from '../helpers/createEnergyCard'

createEnergyCard({
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress
})
