interface Resources {
  glossary: {
    back: 'Back'
  }
  jetty: {
    'menu-glossary': 'Glossary'
    'menu-text': 'Hi friend, how can I help you?'
    'claim-rewards': "Wow speedy, you're a fast learner! Here are your rewards for this quest."
  }
  main: {
    'tabs-basics': 'Basics'
    'tabs-advanced': 'Advanced'
  }
  quests: {
    rewards: 'Rewards'
    requirementsDescription: 'Complete the tasks below to claim your rewards. You can always go back and check the information if you’re not sure how.'
    requirementsTitle: 'What You Need to Do'
    nextButton: 'Next'
    keyImageAlt: 'Quest Image'
    previousButton: 'Back'
    placeholderNotFound: 'Placeholder {{id}} not found'
    claimButton: 'Claim Your Reward'
    minutesToComplete_one: '{{count}} minute'
    minutesToComplete_other: '{{count}} minutes'
    'radquest-logo-alt': 'RadQuest Logo'
    completeQuest: 'Complete Quest'
    'intro-begin-quest': 'Begin Quest'
    WelcomeToRadQuest: {
      requirements: {}
      title: 'Welcome to RadQuest'
      description: 'Your journey begins'
    }
    WhatIsRadix: {
      requirements: {}
      title: 'Introduction to Radix'
      description: 'Become familiar with the Radix network'
    }
    GetRadixWallet: {
      requirements: {}
      title: 'The Radix Wallet'
      description: 'Get set up with the Radix Wallet'
    }
    LoginWithWallet: {
      requirements: {}
      title: 'Login with Wallet'
      description: 'Login with your Radix Wallet'
    }
    FirstTransactionQuest: {
      requirements: {
        VerifyPhoneNumber: 'Verify your phone number'
        DepositUserBadge: 'Deposit a user badge'
      }
      title: 'First Transaction'
      description: 'Make your first transaction'
      failedToSendOtp: 'Failed to send OTP'
      phoneNumberExists: 'Phone number exists'
      invalidPhoneNumber: 'Invalid phone number'
      invalidOtp: 'Invalid one time password'
      invalidRequest: 'Invalid request'
      failedToAddPhoneNumber: 'Failed to add phone number'
      phoneNumberInputTitle: 'Your phone number'
      sendSmsButton: 'Send SMS'
      verifyOtpButton: 'Verify'
      verifyOtpText: 'Enter the 6-digit code sent to'
    }
  }
  transformGems: {
    back: 'Back'
    title0: 'Pick a Transform card'
    title1: 'Pick two gems'
    title2: 'Ready to transform?'
    'next-button': 'Next'
    'complete-button': 'Send to Jetty'
    'gemcard-gemstone': 'Gemstone'
    'gemcard-rarity': 'Rarity'
  }
  translation: {}
}

export default Resources
