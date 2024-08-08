import { logger } from '../../helpers'
import { registerGiftBoxes } from '../helpers/registerGiftBoxes'

registerGiftBoxes().map((result) => logger.debug(result))
