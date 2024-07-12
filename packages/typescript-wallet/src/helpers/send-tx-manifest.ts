import { config } from '../config'
import { transactionBuilder } from '../transaction/transactionBuilder'

export const sendTransactionManifest = (txManifest: string, lock_fee = 100) => {
  const transactionManifest = `
          CALL_METHOD
              Address("${config.radQuest.accounts.payer.address}")
              "lock_fee"
              Decimal("${lock_fee}")
          ;
          
          ${txManifest}
    `

  return transactionBuilder({ transactionManifest, signers: ['payer'] }).submit()
}
