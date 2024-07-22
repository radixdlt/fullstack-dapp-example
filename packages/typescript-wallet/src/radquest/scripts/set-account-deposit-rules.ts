import { logger } from '../../helpers'
import { setAccountsDepositRules } from '../helpers/setAccountsDepositRules'

setAccountsDepositRules()
  .map(({ response }) => {
    logger.info(response)
  })
  .mapErr((error) => {
    logger.error(error)
  })
