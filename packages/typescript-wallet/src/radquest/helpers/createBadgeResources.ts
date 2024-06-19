import { createAdminBadgeResource } from './createAdminBadgeResource'
import { createSuperAdminBadge } from './createSuperAdminBadge'
import { createHeroBadgeResource } from './createHeroBadgeResource'

export const createBadgeResources = () =>
  createSuperAdminBadge().andThen((superAdminBadgeAddress) =>
    createAdminBadgeResource(superAdminBadgeAddress).andThen((adminBadgeAddress) =>
      createHeroBadgeResource(adminBadgeAddress).map((heroBadgeAddress) => ({
        superAdminBadgeAddress,
        adminBadgeAddress,
        heroBadgeAddress
      }))
    )
  )
