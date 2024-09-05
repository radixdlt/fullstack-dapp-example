import { logger } from '../../helpers'
import { deployRadgemForgeV2Package } from '../helpers/deployRadgemForgeV2Package'

deployRadgemForgeV2Package({})
  .map((address) => logger.debug(address))
  .mapErr((err) => logger.error(err))
