import { config } from '../../config'
import { logger } from '../../helpers'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { deployQuestRewardsV2Package } from '../helpers/deployQuestRewardsV2Package'
import { newQuestRewardsV2 } from '../helpers/newQuestRewardsV2'

deployQuestRewardsV2Package({})
  .andThen((addresses) =>
    mintAdminBadge({
      adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
      superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
      amount: 1
    })
      .map(() => logger.debug('Admin Badge minted'))
      .andThen(() => newQuestRewardsV2(addresses.questRewardsV2Package))
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('QuestRewardsV2 instantiated'))
      .map(() => addresses)
  )
  .map((addresses) => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
