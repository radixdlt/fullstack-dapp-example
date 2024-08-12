import { logger } from '../../helpers'
import { setGiftBoxAddresses } from '../helpers/setGiftBoxAddresses'

setGiftBoxAddresses().map((result) => logger.debug(result))
