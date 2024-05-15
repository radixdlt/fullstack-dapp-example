import { Addresses } from 'common'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newQuestRewards } from '../helpers/newQuestRewards'

// mintAdminBadge({
//   adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
//   superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress,
//   amount: 1
// }).then(() => newQuestRewards())
newQuestRewards()
