import { radixEngineClient } from '../../config'
import { logger } from '../../helpers/logger'
import { createBadgeResources } from '../helpers/createBadgeResources'
import { mintAdminBadge } from '../helpers/mintAdminBadge'

const mintAdminBadgeToSystemAccount = (adminBadgeAddress: string, superAdminBadgeAddress: string) =>
  radixEngineClient.getAddresses().andThen(({ accountAddress }) =>
    mintAdminBadge({
      adminBadgeAddress,
      superAdminBadgeAddress,
      accountAddress: accountAddress.systemAccount
    })
  )

createBadgeResources().andThen(({ adminBadgeAddress, superAdminBadgeAddress, heroBadgeAddress }) =>
  mintAdminBadgeToSystemAccount(adminBadgeAddress, superAdminBadgeAddress).map(() =>
    logger.debug({ adminBadgeAddress, superAdminBadgeAddress, heroBadgeAddress })
  )
)
