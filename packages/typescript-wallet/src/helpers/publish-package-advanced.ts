import { bufferToUint8Array, hash } from '.'
import { decodeSbor } from '../transaction/decodeSbor'
import { transactionBuilder } from '../transaction/transactionBuilder'

export const publishPackageAdvanced = ({
  rpd,
  wasm,
  adminBadge
}: {
  rpd: Buffer
  wasm: Buffer
  adminBadge: string
}) =>
  decodeSbor(rpd)
    .map((sborDecodedSchema) => {
      const wasmHash = hash(wasm).toString('hex')
      const transactionManifest = `
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
        `
      const transaction = transactionBuilder({
        transactionManifest,
        signers: ['system'],
        optional: {
          lockFee: 500,
          blobs: [bufferToUint8Array(wasm)]
        }
      })

      return transaction
        .submit()
        .andThen(({ transactionId }) => transaction.helper.getCreatedEntities(transactionId))
        .map((createdEntities): string => createdEntities[0].entity_address!)
    })
    .andThen((res) => res)
