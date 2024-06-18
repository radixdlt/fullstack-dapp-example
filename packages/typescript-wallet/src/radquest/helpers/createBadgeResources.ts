import { createAdminBadgeResource } from './createAdminBadgeResource'
import { createSuperAdminBadge } from './createSuperAdminBadge'
import { createUserBadgeResource } from './createUserBadgeResource'

export const createBadgeResources = () =>
  createSuperAdminBadge().andThen((superAdminBadgeAddress) =>
    createAdminBadgeResource(superAdminBadgeAddress).andThen((adminBadgeAddress) =>
      createUserBadgeResource(adminBadgeAddress).map((heroBadgeAddress) => ({
        superAdminBadgeAddress,
        adminBadgeAddress,
        heroBadgeAddress
      }))
    )
  )
