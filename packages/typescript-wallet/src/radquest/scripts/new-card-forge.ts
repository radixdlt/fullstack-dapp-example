import { newCardForge } from '../helpers/newCardForge'
import { mintAdminBadge } from '../helpers/mintAdminBadge'
import { config } from '../../config'
import { logger } from '../../helpers'
import { addCardForgeCards } from '../helpers/addCardForeCards'

mintAdminBadge({
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress
})
  .andThen(() => newCardForge())
  .map(({ cardForgeAddress }) => {
    addCardForgeCards(cardForgeAddress).map(() => logger.debug({ cardForgeAddress }))
  })
