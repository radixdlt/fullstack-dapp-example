import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { config } from '../../config'
import { logger } from '../../helpers'
import { newCardForgeV2 } from '../helpers/newCardForgeV2'

const result: Record<string, string> = {}

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  amount: 1
})
  .andThen(() => newCardForgeV2())
  .map((res) => Object.assign(result, res))
  .map(() => logger.debug(result))
  .mapErr((err) => logger.error(err, '\n\nDid you forget to rebuild the Scrypto package?\n'))
