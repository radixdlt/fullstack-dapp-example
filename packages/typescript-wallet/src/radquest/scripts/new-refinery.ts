import { newRefinery } from '../helpers/newRefinery'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { Addresses } from 'common'
import { logger } from '../../helpers'

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress,
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
