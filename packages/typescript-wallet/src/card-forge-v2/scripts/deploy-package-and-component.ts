import { config } from '../../config'
import { logger } from '../../helpers'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { deployCardForgeV2Package } from '../helpers/deployCardForgeV2Package'
import { newCardForgeV2 } from '../helpers/newCardForgeV2'

deployCardForgeV2Package({})
  .andThen((addresses) =>
    mintAdminBadge({
      adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
      superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
      amount: 1
    })
      .map(() => logger.debug('Admin Badge minted'))
      .andThen(() => newCardForgeV2(addresses.cardForgeV2Package))
      .map((res) => Object.assign(addresses, res))
      .map(() => logger.debug('CardForgeV2 instantiated'))
      .map(() => addresses)
  )
  .map((addresses) => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
