import { logger } from '../../helpers'
import { deployRadquestPackage } from '../helpers/deployRadquestPackage'

deployRadquestPackage({})
  .map((address) => logger.debug(address))
  .mapErr((err) => logger.error(err))
