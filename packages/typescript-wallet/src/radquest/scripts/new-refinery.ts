import { newRefinery } from '../helpers/newRefinery'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { logger } from '../../helpers'
import { config } from '../../config'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 3
}).then(() =>
  newRefinery().map(
    ({ radgemForgeAddress, radmorphForgeAddress, imageOracleAddress, refineryAddress }) =>
      logger.debug({
        radgemForgeAddress,
        radmorphForgeAddress,
        imageOracleAddress,
        refineryAddress
      })
  )
)
