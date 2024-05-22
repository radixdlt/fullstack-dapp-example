import { Addresses } from 'common'
import { newClamDex } from '../helpers/newClamDex'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress,
  amount: 1
}).then(() =>
  newClamDex('LettySwap Component', 'Use this component to try to swap Clams for Elements')
)
