import { ok } from 'neverthrow'
import { StateVersionModel } from '../state-version/state-version.model'
import { EventsModel } from '../events/events.model'
import { GatewayApi } from 'common'

export const getLatestStateVersion = ({
  stateVersionModel,
  eventsModel,
  gatewayApi
}: {
  stateVersionModel: StateVersionModel
  eventsModel: EventsModel
  gatewayApi: GatewayApi
}) =>
  stateVersionModel
    .getLatestProcessedStateVersion()
    .andThen((value) =>
      value
        ? ok(value + 1)
        : eventsModel
            .getLastAddedTransactionId()
            .andThen((lastTransactionId) =>
              lastTransactionId
                ? gatewayApi
                    .callApi('getStatus', lastTransactionId)
                    .map((item) => item.committed_state_version! + 1)
                : gatewayApi.callApi('getCurrent').map((item) => item.ledger_state.state_version)
            )
    )
