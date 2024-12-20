import { metadata } from 'common'
import { createGiftBoxResource } from '../helpers/createGiftBoxResource'
import { ResultAsync } from 'neverthrow'
import { config } from '../../config'

export const createGiftBoxes = ({
  superAdminBadgeAddress,
  adminBadgeAddress
}: {
  superAdminBadgeAddress: string
  adminBadgeAddress: string
}) => {
  const entries = Object.entries(metadata.resources.giftBox)
  const result = ResultAsync.combine(
    entries.map(([key, value]) =>
      createGiftBoxResource({
        superAdminBadgeAddress,
        adminBadgeAddress,
        metadata: value
      }).map((res) => [key, res])
    )
  )

  return result
}

createGiftBoxes({
  superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
  adminBadgeAddress: config.radQuest.badges.adminBadgeAddress
}).map((results) => {
  console.log(Object.fromEntries(results))
})
