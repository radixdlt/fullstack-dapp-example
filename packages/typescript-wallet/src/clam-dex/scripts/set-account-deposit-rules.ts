import { logger } from '../../helpers'
import { setAccountsDepositRules } from '../helpers/setAccountsDepositRules'

setAccountsDepositRules()
  .map(({ response }) => {
    logger.debug(response)
  })
  .mapErr((error) => {
    logger.error(error)
  })
