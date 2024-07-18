import { config } from '../config'
import { decodeSbor } from '../transaction/decodeSbor'
import { transactionBuilder } from '../transaction/transactionBuilder'
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
  decodeSbor(rpdBuffer)
    .map((rpdDecoded) => {
      const wasmHash = hash(wasmBuffer).toString('hex')
      const transactionManifest = `
PUBLISH_PACKAGE
  ${rpdDecoded}
  Blob("${wasmHash}") 
  Map<String, Tuple>()  
;
CALL_METHOD
  Address("${config.radQuest.accounts.system.address}")
  "deposit_batch"
  Expression("ENTIRE_WORKTOP")
;
`
      const transaction = transactionBuilder({
        transactionManifest,
        signers: [],
        optional: { lockFee }
      })

      return transaction.submit().andThen(({ transactionId }) =>
        transaction.helper.getCommittedDetails(transactionId).map((res) => ({
          packageAddress: res.createdEntities[0].entity_address,
          ...getOwnerBadge(res.events)
        }))
      )
    })
    .andThen((res) => res)
