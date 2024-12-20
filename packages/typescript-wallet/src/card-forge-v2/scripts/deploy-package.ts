import { logger } from '../../helpers'
import { deployCardForgeV2Package } from '../helpers/deployCardForgeV2Package'

deployCardForgeV2Package({})
  .map((address) => logger.debug(address))
  .mapErr((err) => logger.error(err))
