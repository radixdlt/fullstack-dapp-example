import { Addresses } from 'common'
import { logger } from '../../helpers/logger'
import { createHeroBadgeResource } from '../helpers/createHeroBadgeResource'

createHeroBadgeResource(Addresses(2).badges.adminBadgeAddress).map((result) => logger.debug(result))
