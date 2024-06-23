import { User } from 'database'
import { GatewayApi } from 'common'
import { WorkerError } from '../_types'

export const hasHeroBadge = (user: User, gatewayApi: GatewayApi) =>
  gatewayApi.hasHeroBadge(user.accountAddress!).mapErr((error) => ({
    reason: WorkerError.GatewayError,
    jsError: error
  }))
