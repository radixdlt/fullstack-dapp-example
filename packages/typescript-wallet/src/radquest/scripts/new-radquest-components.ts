import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { newRefinery } from '../helpers/newRefinery'
import { logger } from '../../helpers'
import { config } from '../../config'

let result: Record<string, string> = {}

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 2
})
  .andThen(() => newRefinery())
  .map(({ radmorphForgeAddress, imageOracleAddress, refineryAddress }) => {
    result.radmorphForge = radmorphForgeAddress
    result.imageOracle = imageOracleAddress
    result.refinery = refineryAddress
  })
  .mapErr((err) => logger.error(err, '\n\nDid you forget to rebuild the Scrypto package?'))
  .map(() => logger.debug('\nNew RadQuest component addresses:', result))
