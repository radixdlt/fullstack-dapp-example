import { logger } from '../../helpers'
import { deployQuestRewardsV2Package } from '../helpers/deployQuestRewardsV2Package'

deployQuestRewardsV2Package({})
  .map((address) => logger.debug(address))
  .mapErr((err) => logger.error(err))
