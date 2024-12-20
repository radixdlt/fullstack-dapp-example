import { radixEngineClient } from '../config'
import { logger } from '../helpers'

radixEngineClient
  .getAccountAddress()
  .map((address) =>
    Object.entries(address).map(([name, address]) => ({
      name,
      address,
      dashboardUrl: `${radixEngineClient.gatewayClient.networkConfig.dashboardUrl}/account/${address}`
    }))
  )
  .map((addresses) => {
    logger.debug(addresses)
  })
  .mapErr((err) => logger.error(err))
