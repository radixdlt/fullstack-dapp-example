import { radixEngineClient } from '../../config'
import { logger } from '../../helpers/logger'
import { createResources } from '../helpers/createResources'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { createGiftBoxes } from './create-gift-boxes'

const mintAdminBadgeToSystemAccount = (adminBadgeAddress: string, superAdminBadgeAddress: string) =>
  radixEngineClient.getAddresses().andThen(({ accountAddress }) =>
    mintAdminBadge({
      adminBadgeAddress,
      superAdminBadgeAddress,
      accountAddress: accountAddress.systemAccount
    })
  )

createResources()
  .andThen((resources) =>
    createGiftBoxes({
      superAdminBadgeAddress: resources.superAdminBadgeAddress,
      adminBadgeAddress: resources.adminBadgeAddress
    })
      .map((giftBoxes) => giftBoxes.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}))
      .map((giftBox) => ({ ...resources, giftBox }))
      .andThen((resources) =>
        mintAdminBadgeToSystemAccount(
          resources.adminBadgeAddress,
          resources.superAdminBadgeAddress
        ).map(() => logger.debug(resources))
      )
  )
  .mapErr((error) => logger.error(error))
