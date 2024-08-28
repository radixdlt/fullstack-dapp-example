import { okAsync } from 'neverthrow'
import { DepositXrdJob } from 'queues'
import { config } from '../config'

export const createDepositXrdManifest = (items: DepositXrdJob[]) => {
  const { accounts, xrd, directXrdDepositAmount } = config.radQuest

  const xrdToWithdraw = directXrdDepositAmount * items.length

  const sendToUsers = items
    .map((item, index) => {
      const bucketName = `xrd_bucket_${index}`
      return `
        TAKE_FROM_WORKTOP
          Address("${xrd}")
          Decimal("${directXrdDepositAmount}")
          Bucket("${bucketName}")
        ;
      
        CALL_METHOD
          Address("${item.accountAddress}")
          "try_deposit_or_abort"
          Bucket("${bucketName}")
          None
        ;`
    })
    .join('\n')

  return okAsync(`
    CALL_METHOD
      Address("${accounts.payer.accessController}")
      "create_proof"
    ;

    CALL_METHOD
      Address("${accounts.system.accessController}")
      "create_proof"
    ;
    
    CALL_METHOD
      Address("${accounts.payer.address}")
      "lock_fee"
      Decimal("50")
    ;

    CALL_METHOD
      Address("${accounts.payer.address}")
      "withdraw"
      Address("${xrd}")
      Decimal("${xrdToWithdraw}")
    ;

    ${sendToUsers}
  `)
}
