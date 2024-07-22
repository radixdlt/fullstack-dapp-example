import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const setAccountsDepositRules = () => {
  const transactionManifest = `
CALL_METHOD
    Address("${config.radQuest.accounts.jettySwapDappDefinition.address}")
    "set_default_deposit_rule"
    Enum<DefaultDepositRule::Reject>()
;
CALL_METHOD
    Address("${config.radQuest.accounts.lettySwapDappDefinition.address}")
    "set_default_deposit_rule"
    Enum<DefaultDepositRule::Reject>()
;
CALL_METHOD
    Address("${config.radQuest.accounts.jettySwapDappDefinition.address}")
    "set_resource_preference"
    Address("${config.radQuest.resources.clamAddress}")
    Enum<ResourcePreference::Allowed>()
;
CALL_METHOD
    Address("${config.radQuest.accounts.lettySwapDappDefinition.address}")
    "set_resource_preference"
    Address("${config.radQuest.resources.clamAddress}")
    Enum<ResourcePreference::Allowed>()
;
`

  const transaction = transactionBuilder({
    transactionManifest,
    signers: ['jettySwapDappDefinition', 'lettySwapDappDefinition']
  })

  return transaction.submit()
}
