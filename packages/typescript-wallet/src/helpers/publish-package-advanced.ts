import { bufferToUint8Array, hash } from '.'
import { radixEngineClient } from '..'

export const publishPackageAdvanced = ({
  rpd,
  wasm,
  adminBadge
}: {
  rpd: Buffer
  wasm: Buffer
  adminBadge: string
}) =>
  radixEngineClient.decodeSbor(rpd).andThen((sborDecodedSchema) =>
    radixEngineClient
      .getManifestBuilder()
      .andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) => {
        const wasmHash = hash(wasm).toString('hex')
        return convertStringManifest(
          `     
        CALL_METHOD
          Address("${wellKnownAddresses.accountAddress.payerAccount}")
          "lock_fee"
          Decimal("500")
        ;
        PUBLISH_PACKAGE_ADVANCED
          Enum<1u8>(
            Enum<2u8>(
                Enum<0u8>(
                    Enum<0u8>(
                        Enum<1u8>(
                            Address("${adminBadge}")
                        )
                    )
                )
            )
          )
          ${sborDecodedSchema}
          Blob("${wasmHash}")
          Map<String, Tuple>()
          None;
       `,
          [bufferToUint8Array(wasm)]
        )
          .andThen((value) =>
            submitTransaction({ transactionManifest: value, signers: ['systemAccount'] })
          )
          .andThen(({ txId }) =>
            radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
          )
          .andThen((txId) => radixEngineClient.gatewayClient.getCommittedDetails(txId))
          .map((details): string => details.createdEntities[0].entity_address!)
      })
  )
