interface Resources {
  main: {
    title: 'JettySwap'
    'radquest-info': 'You can swap your\nRadQuest goods!'
    'marketplace-estimates': 'Market price estimate:'
    'guarantee-hint': 'You can change minimum guarantee\nsettings in your Radix Wallet.'
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
      'failure-desc': 'Your minimum guarantee amount\nwas not met.'
      button: 'close'
    }
  }
}

export default Resources
