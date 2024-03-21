import BigNumber from 'bignumber.js'
import { config } from '../../config'
import { AuditResource } from 'common'

export const getFirstTransactionAuditResources = (
  xrdAmount: BigNumber,
  userId: string
): AuditResource[] => [
  {
    type: 'fungible',
    resourceAddress: config.radQuest.xrd,
    amount: xrdAmount.toNumber()
  },
  {
    type: 'nonFungible',
    resourceAddress: config.radQuest.badges.userBadgeAddress,
    localId: `<${userId}>`
  }
]
