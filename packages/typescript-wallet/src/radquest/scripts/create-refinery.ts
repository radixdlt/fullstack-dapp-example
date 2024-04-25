import { createRefinery } from '../helpers/createRefinery'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { Addresses } from 'common'

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress,
  amount: 3
})
createRefinery()
