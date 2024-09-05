import { logger } from '../../helpers'
import { deployGiftBoxOpenerV2Package } from '../helpers/deployGiftBoxOpenerV2Package'

deployGiftBoxOpenerV2Package({})
  .map((address) => logger.debug(address))
  .mapErr((err) => logger.error(err))
