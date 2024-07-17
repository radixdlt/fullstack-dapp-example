import { transactionBuilder } from '../transaction/transactionBuilder'

export const sendTransactionManifest = (transactionManifest: string, lockFee = 100) =>
  transactionBuilder({ transactionManifest, signers: [], lockFee }).submit()
