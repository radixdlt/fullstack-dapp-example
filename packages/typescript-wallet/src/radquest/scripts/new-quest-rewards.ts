import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newQuestRewards } from '../helpers/newQuestRewards'
import { logger } from '../../helpers'
import { config } from '../../config'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 1
}).then(() =>
  newQuestRewards().map(({ kycOracleAddress, questRewardsAddress }) => {
    logger.debug({ kycOracleAddress, questRewardsAddress })
    return kycOracleAddress
  })
)
// TODO: add way to get kycOracleKeyValueStoreAddress
