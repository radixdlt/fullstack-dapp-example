import { radixEngineClient } from '../config'
import { bufferToUint8Array } from './blake2b'
import { getOwnerBadge } from './getOwnerBadge'
import { hash } from './hash'

export const deployPackage = ({
  wasmBuffer,
  rpdBuffer,
  lockFee
}: {
  wasmBuffer: Buffer
  rpdBuffer: Buffer
  lockFee: number
}) =>
  radixEngineClient
    .getManifestBuilder()
    .andThen((engineToolkit) =>
      radixEngineClient.decodeSbor(rpdBuffer).map((rpdDecoded) => ({
        wasmBuffer,
        rpdBuffer,
        rpdDecoded,
        ...engineToolkit
      }))
    )
    .andThen(
      ({
        wasmBuffer,
        rpdDecoded,
        convertStringManifest,
        submitTransaction,
        wellKnownAddresses
      }) => {
        const wasmHash = hash(wasmBuffer).toString('hex')

        return convertStringManifest(`
          CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.payerAccount}")
            "lock_fee"
            Decimal("${lockFee}")
          ;

          PUBLISH_PACKAGE
            ${rpdDecoded}
            Blob("${wasmHash}") 
            Map<String, Tuple>()  
          ;
          
          CALL_METHOD
            Address("${wellKnownAddresses.accountAddress.systemAccount}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
          ;
    `)
          .andThen(({ instructions }) =>
            submitTransaction(
              {
                instructions,
                blobs: [bufferToUint8Array(wasmBuffer)]
              },
              []
            )
          )
          .andThen(({ txId }) =>
            radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
          )
          .andThen((txId) =>
            radixEngineClient.gatewayClient.getCommittedDetails(txId).map((res) => ({
              packageAddress: res.createdEntities[0].entity_address,
              ...getOwnerBadge(res.events)
            }))
          )
      }
    )
