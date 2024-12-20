import { newTicketMachine } from '../helpers/newTicketMachine'
import { logger } from '../../helpers/index'

newTicketMachine(50)
  .mapErr((err) => logger.error(err))
  .map((result) => logger.debug(result))
