import { config } from '../../config'
import { transactionBuilder } from '../../transaction/transactionBuilder'

export const setAccountsDepositRules = () => {
  const transactionManifest = `
CALL_METHOD
    Address("${config.radQuest.accounts.owner.address}")
    "set_default_deposit_rule"
    Enum<DefaultDepositRule::Reject>()
;
CALL_METHOD
    Address("${config.radQuest.accounts.payer.address}")
    "set_default_deposit_rule"
    Enum<DefaultDepositRule::Reject>()
;
CALL_METHOD
    Address("${config.radQuest.accounts.system.address}")
    "set_default_deposit_rule"
    Enum<DefaultDepositRule::Reject>()
;
CALL_METHOD
    Address("${config.radQuest.accounts.dAppDefinition.address}")
    "set_default_deposit_rule"
    Enum<DefaultDepositRule::Reject>()
;
CALL_METHOD
    Address("${config.radQuest.accounts.system.address}")
    "set_resource_preference"
    Address("${config.radQuest.badges.adminBadgeAddress}")
    Enum<ResourcePreference::Allowed>()
;
CALL_METHOD
    Address("${config.radQuest.accounts.payer.address}")
    "set_resource_preference"
    Address("${config.radQuest.xrd}")
    Enum<ResourcePreference::Allowed>()
;
`

  const transaction = transactionBuilder({
    transactionManifest,
    signers: ['dAppDefinition', 'owner', 'system']
  })

  return transaction.submit()
}
