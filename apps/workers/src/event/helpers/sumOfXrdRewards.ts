import BigNumber from 'bignumber.js'
import { AuditResource, AuditFungibleResource } from 'common'
import { config } from '../../config'

export const sumOfXrdRewards = (rewards: AuditResource[]) =>
  rewards
    .filter(
      (r): r is AuditFungibleResource =>
        r.resourceAddress === config.radQuest.xrd && r.type === 'fungible'
    )
    .reduce((acc, resource) => {
      return acc.plus(resource.amount)
    }, BigNumber(0))
