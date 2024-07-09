import { createAdminBadgeResource } from './createAdminBadgeResource'
import { createSuperAdminBadge } from './createSuperAdminBadge'
import { createHeroBadgeResource } from './createHeroBadgeResource'
import { createClamResource } from './createClamResource'
import { createElementResource } from './createElementResource'
import { createRadgem } from './createRadgem'
import { createEnergyCard } from './createEnergyCard'
import { createRadmorph } from './createRadmorph'

let resources: Record<string, string> = {}

export const createResources = () =>
  createSuperAdminBadge().andThen((superAdminBadgeAddress) =>
    createAdminBadgeResource(superAdminBadgeAddress).andThen((adminBadgeAddress) =>
      createHeroBadgeResource({ superAdminBadgeAddress, adminBadgeAddress })
        .map((heroBadgeAddress) => (resources.heroBadgeAddress = heroBadgeAddress))
        .andThen(() => createElementResource({ superAdminBadgeAddress, adminBadgeAddress }))
        .map((elementAddress) => (resources.elementAddress = elementAddress))
        .andThen(() => createClamResource({ superAdminBadgeAddress, adminBadgeAddress }))
        .map((clamAddress) => (resources.clamAddress = clamAddress))
        .andThen(() => createRadgem({ superAdminBadgeAddress, adminBadgeAddress }))
        .map((radgemAddress) => (resources.radgemAddress = radgemAddress))
        .andThen(() => createEnergyCard({ superAdminBadgeAddress, adminBadgeAddress }))
        .map((energyCardAddress) => (resources.energyCardAddress = energyCardAddress))
        .andThen(() => createRadmorph({ superAdminBadgeAddress, adminBadgeAddress }))
        .map((radmorphAddress) => (resources.radmorphAddress = radmorphAddress))
        .map(() => ({ adminBadgeAddress, superAdminBadgeAddress, ...resources }))
    )
  )
