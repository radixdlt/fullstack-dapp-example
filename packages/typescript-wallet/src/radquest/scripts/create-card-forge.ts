import { Addresses } from 'common'
import { createCardForge } from '../helpers/createCardForge'
import { mintAdminBadge } from '../helpers/mintAdminBadge'

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress
}).then(() => {
  createCardForge()
})
