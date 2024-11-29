import { Addresses } from 'common'
import { mintAdminBadge } from '../helpers/mintAdminBadge'

const { accounts, badges } = Addresses

mintAdminBadge({
  accountAddress: accounts.system.address,
  adminBadgeAddress: badges.adminBadgeAddress,
  superAdminBadgeAddress: badges.superAdminBadgeAddress
})
