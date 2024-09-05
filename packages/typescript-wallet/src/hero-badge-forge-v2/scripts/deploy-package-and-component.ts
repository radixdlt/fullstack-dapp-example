import { config } from '../../config'
import { logger } from '../../helpers'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { deployHeroBadgeForgeV2Package } from '../helpers/deployHeroBadgeForgeV2Package'
import { newHeroBadgeForgeV2 } from '../helpers/newHeroBadgeForgeV2'

deployHeroBadgeForgeV2Package({}).andThen((addresses) =>
  mintAdminBadge({
    adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
    superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
    amount: 1
  })
    .map(() => logger.debug('Admin badge minted'))
    .andThen(() => newHeroBadgeForgeV2(addresses.heroBadgeForgeV2Package))
    .map((res) => Object.assign(addresses, res))
    .map(() => logger.debug('HeroBadgeForgeV2 instantiated'))
    .map(() => addresses)
    .map((addresses) => logger.debug(addresses))
    .mapErr((err) => logger.error(err))
)
