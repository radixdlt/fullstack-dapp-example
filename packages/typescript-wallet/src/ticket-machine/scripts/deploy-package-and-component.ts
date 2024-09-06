import { logger } from '../../helpers'
import { newTicketMachine } from '../helpers/newTicketMachine'
import { deployTicketMachinePackage } from '../helpers/deployTicketMachinePackage'

deployTicketMachinePackage({})
  .andThen((addresses) =>
    newTicketMachine(50, addresses.ticketMachinePackage)
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('TicketMachine instantiated'))
      .map(() => addresses)
  )
  .map((addresses) => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
