import { Addresses } from 'common'
import { mintAdminBadge } from '../helpers/mintAdminBadge'

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress
})
