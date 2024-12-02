import { Addresses } from 'common'
import { mintAdminBadge } from '../helpers/mintAdminBadge'

const { accounts, badges } = Addresses(parseInt(process.env.PUBLIC_NETWORK_ID!))

mintAdminBadge({
  accountAddress: accounts.system.address,
  adminBadgeAddress: badges.adminBadgeAddress,
  superAdminBadgeAddress: badges.superAdminBadgeAddress
})
