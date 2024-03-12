import { ok } from 'neverthrow'
import { StateVersionModel } from '../state-version/state-version.model'
import type { EventModelMethods } from 'common'
import { GatewayApi } from 'common'

export const getLatestStateVersion = ({
  stateVersionModel,
  eventModel,
  gatewayApi
}: {
  stateVersionModel: StateVersionModel
  eventModel: EventModelMethods
  gatewayApi: GatewayApi
}) =>
  stateVersionModel
    .getLatestProcessedStateVersion()
    .andThen((value) =>
      value
        ? ok(value)
        : eventModel
            .getLastAddedTransactionId()
            .andThen((lastTransactionId) =>
              lastTransactionId
                ? gatewayApi
                    .callApi('getStatus', lastTransactionId)
                    .map((item) => item.committed_state_version!)
                : gatewayApi.callApi('getCurrent').map((item) => item.ledger_state.state_version)
            )
    )
