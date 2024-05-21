interface Resources {
  main: {
    title: 'JettySwap'
    'radquest-info': 'You can swap your'
    'radquest-info-goods': 'RadQuest goods!'
    'marketplace-estimates': 'Market price estimate:'
    marketplace_resource_one: '{{resource}}'
    marketplace_resource_other: '{{resource}}s'
    'guarantee-hint': 'You can change minimum guarantee'
    'guarantee-hint-part-2': 'settings in your Radix Wallet.'
    'estimated-amount': 'Estimated at market price'
    'balance-amount_one': 'Balance: {{count}} {{resource}}'
    'balance-amount_other': 'Balance: {{count}} {{resource}}s'
    from: 'from'
    to: 'to'
    'not-enough-resource': 'Not enough {{resource}}s in your wallet'
    'swap-card-title': 'Swap'
    'swap-button': {
      'connect-wallet': 'No Wallet Connected'
      swap: 'Swap'
    }
    'swap-modal': {
      'success-title': 'Swap Complete!'
      'success-desc': 'You received {{amount}} {{resource}}'
      'failure-title': 'Swap Failed'
      'failure-desc': 'Your minimum guarantee amount'
      'failure-desc-not-met': 'was not met.'
      button: 'close'
    }
  }
}

export default Resources
