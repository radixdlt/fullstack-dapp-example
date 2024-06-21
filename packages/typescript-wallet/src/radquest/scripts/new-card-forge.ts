import { Addresses } from 'common'
import { newCardForge } from '../helpers/newCardForge'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { logger } from '../../helpers'
import { addCardForgeCards } from '../helpers/addCardForeCards'

mintAdminBadge({
  adminBadgeAddress: Addresses(2).badges.adminBadgeAddress,
  superAdminBadgeAddress: Addresses(2).badges.superAdminBadgeAddress
})
  .andThen(() => newCardForge())
  .map(({ cardForgeAddress }) => {
    addCardForgeCards(cardForgeAddress).map(() => logger.debug({ cardForgeAddress }))
  })
