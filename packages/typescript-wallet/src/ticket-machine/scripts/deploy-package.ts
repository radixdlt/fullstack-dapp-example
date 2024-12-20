import { deployTicketMachinePackage } from '../helpers/deployTicketMachinePackage'
import { logger } from '../../helpers'

deployTicketMachinePackage({})
  .map((addresses) => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
