import { config } from '../../config'
import { logger } from '../../helpers'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { deployRadgemForgeV2Package } from '../helpers/deployRadgemForgeV2Package'
import { newRadgemForgeV2 } from '../helpers/newRadgemForgeV2'

deployRadgemForgeV2Package({})
  .andThen((addresses) =>
    mintAdminBadge({
      adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
      superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
      amount: 1
    })
      .map(() => logger.debug('Admin Badge minted'))
      .andThen(() => newRadgemForgeV2(addresses.radgemForgeV2Package))
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('RadgemForgeV2 component instantiated'))
      .map(() => addresses)
  )
  .map((addresses) => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
