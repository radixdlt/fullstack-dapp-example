import { Addresses } from 'common'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newQuestRewards } from '../helpers/newQuestRewards'
import { logger } from '../../helpers'

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress,
  amount: 1
}).then(() =>
  newQuestRewards().map(({ kycOracleAddress, questRewardsAddress }) => {
    logger.debug({ kycOracleAddress, questRewardsAddress })
    return kycOracleAddress
  })
)
// TODO: add way to get kycOracleKeyValueStoreAddress
