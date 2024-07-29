import { newClamDex } from '../helpers/newClamDex'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { config } from '../../config'
import { logger } from '../../helpers'

let result: Record<string, string> = {}

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 2
})
  .andThen(() =>
    newClamDex(
      'JettySwap Component',
      config.radQuest.accounts.jettySwapDappDefinition.address,
      true
    )
  )
  .map((components) => {
    result.jettySwap = components.dex
    result.jettySwapPriceOracle = components.priceOracle
  })
  .andThen(() =>
    newClamDex(
      'LettySwap Component',
      config.radQuest.accounts.lettySwapDappDefinition.address,
      false
    )
  )
  .map((components) => {
    result.lettySwap = components.dex
    result.lettySwapPriceOracle = components.priceOracle
  })
  .mapErr((err) => logger.error(err, '\n\nDid you forget to rebuild the Scrypto package?'))
  .map(() => logger.debug('\nNew ClamDex component addresses:', result))
