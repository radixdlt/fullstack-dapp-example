import { deployHeroBadgeForgeV2Package } from '../helpers/deployHeroBadgeForgeV2Package'
import { logger } from '../../helpers'

deployHeroBadgeForgeV2Package({})
  .map((address) => logger.debug(address))
  .mapErr((err) => logger.error(err))
