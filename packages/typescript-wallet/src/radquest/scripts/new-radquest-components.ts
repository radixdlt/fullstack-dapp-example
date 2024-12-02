import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newRefinery } from '../helpers/newRefinery'
import { logger } from '../../helpers'
import { config } from '../../config'

let result: Record<string, string> = {}

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 7
})
  .andThen(() => newRefinery())
  .map(({ radgemForgeAddress, radmorphForgeAddress, imageOracleAddress, refineryAddress }) => {
    result.radgemForge = radgemForgeAddress
    result.radmorphForge = radmorphForgeAddress
    result.imageOracle = imageOracleAddress
    result.refinery = refineryAddress
  })
  .mapErr((err) => logger.error(err, '\n\nDid you forget to rebuild the Scrypto package?'))
  .map(() =>
    logger.debug(
      '\nNew RadQuest component addresses:',
      result,
      `\n\nDon't forget to get the kycOracleKeyValueStore from the Dashboard!

You can find it here:
https://stokenet-dashboard.radixdlt.com/component/${result.kycOracle}/state`
    )
  )
