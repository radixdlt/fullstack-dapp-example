import { ok } from 'neverthrow'
import type { EventModelMethods, TransactionStreamModel } from 'common'
import { GatewayApi } from 'common'

export const getLatestStateVersion = ({
  transactionStreamModel,
  eventModel,
  gatewayApi
}: {
  transactionStreamModel: TransactionStreamModel
  eventModel: EventModelMethods
  gatewayApi: GatewayApi
}) =>
  transactionStreamModel
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
