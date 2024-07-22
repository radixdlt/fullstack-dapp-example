import { transactionBuilder } from '../../transaction/transactionBuilder'
import { config } from '../../config'

const userId = process.argv[2]

const transactionManifest = `
        CALL_METHOD
          Address("${config.radQuest.accounts.system.address}")
          "create_proof_of_amount"
          Address("${config.radQuest.badges.adminBadgeAddress}")
          Decimal("1")
        ;

        CALL_METHOD
          Address("${config.radQuest.components.kycOracle}")
          "update_user_kyc_requirement"
          "${userId}"
          true
        ;`
transactionBuilder({ transactionManifest, signers: ['system'] })
  .submit()
  .map(({ transactionId }) => transactionId)
  .mapErr((e) => console.log(e))
