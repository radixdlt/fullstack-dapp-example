interface Resources {
  glossary: {
    back: 'Back'
    definitionMissing: "Definition doesn't exist"
  }
  jetty: {
    'menu-glossary': 'Glossary'
    'menu-text': 'Hi friend, how can I help you?'
    'claim-rewards': "Wow speedy, you're a fast learner! Here are your rewards for this quest."
    'reward-text_one': '{{name}}'
    'reward-text_other': '{{name}}s'
    'logged-in-with-wallet': "I see you've logged in with your wallet!"
    'go-back-to-quest': 'Go back to quest'
  }
  main: {
    'tabs-basics': 'Basics'
    'tabs-advanced': 'Advanced'
    landingPagePopup: {
      title: 'Welcome to RadQuest'
      message: 'Ready to earn your rare NFT and up to $20 in XRD? Start your quest journey now.'
      button: "Let's begin"
    }
  }
  quests: {
    rewards: 'Rewards'
    requirementsDescription: 'Complete the tasks below to claim your rewards. You can always go back and check the information if you’re not sure how.'
    requirementsTitle: 'What You Need to Do'
    nextButton: 'Next'
    keyImageAlt: 'Quest Image'
    backButton: 'Back'
    continueButton: 'Continue'
    placeholderNotFound: 'Placeholder {{id}} not found'
    claimButton: 'Claim'
    minutesToComplete_one: '{{count}} minute'
    minutesToComplete_other: '{{count}} minutes'
    'radquest-logo-alt': 'RadQuest Logo'
    somethingWentWrong: 'Something went wrong, please try again.'
    completeQuest: 'Complete Quest'
    'intro-begin-quest': 'Begin Quest'
    okButton: 'OK'
    WelcomeToRadQuest: {
      hi: 'Meet Jetty'
      claim: 'Claim'
      requirements: {
        Introduction: 'Understand what RadQuest is'
        Glossary: 'Use Jetty’s Glossary'
        RadQuestQuiz: 'Complete the RadQuest Quiz'
      }
      title: 'Welcome to RadQuest'
      description: 'Begin your Radix journey'
      introDescription: 'Journey with Jetty through RadQuest and uncover the hidden depths of the Radix ecosystem. Complete tasks and win tokens, NFTs and XRD.'
    }
    WhatIsRadix: {
      requirements: {
        LearnAboutRadix: 'Learn about the Radix network'
        RadixQuiz: 'Complete the Radix Quiz'
        dAppQuiz: 'Complete the dApp Quiz'
      }
      title: 'Introduction to Radix'
      description: 'Become familiar with the Radix network'
      introDescription: 'Radix is a decentralized network that aims to solve the scalability problem of blockchain technology. Learn more about Radix and how it works.'
    }
    GetRadixWallet: {
      requirements: {
        GetTheWallet: 'Download the Radix Wallet'
      }
      title: 'The Radix Wallet'
      description: 'Get set up with the Radix Wallet'
      introDescription: 'The Radix Wallet is your gateway to the Radix network. Download the wallet and get started.'
    }
    LoginWithWallet: {
      requirements: {
        ConnectWallet: 'Connect your Radix Wallet'
        ConnectAccount: 'Connect your account'
      }
      title: 'Login with Wallet'
      description: 'Login with your Radix Wallet'
      introDescription: 'Login with your Radix Wallet to start earning rewards.'
      connectAccount: 'Connect Account'
    }
    FirstTransactionQuest: {
      requirements: {
        VerifyPhoneNumber: 'Verify your phone number'
        DepositUserBadge: 'Deposit a user badge'
      }
      title: 'First Transaction'
      description: 'Claim your first rewards'
      introDescription: 'Get some XRD tokens, and use them to do your first transaction: claiming your quest rewards right to your Radix Wallet.'
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
      allowMarketing: 'I allow RadQuest to add me to the marketing newsletter'
    }
    TransferTokens: {
      requirements: {
        JettyReceivedClams: 'Send Clams to Jetty'
      }
      title: 'Transfer Tokens'
      description: 'Transfer tokens to another account'
      introDescription: 'Transfer tokens to another account to earn your reward.'
      copyTextButton_copy: 'Copy'
      copyTextButton_copied: 'Copied!'
    }
    StakingQuest: {
      goToRadixDashboard: 'Go to Radix Dashboard'
      title: 'Doing first Radix Network stake'
      description: 'Learn what staking is and what it brings you and the Radar network.'
      introDescription: 'What is staking and what does it matter? Earn some APY with your staked tokens.'
      requirements: {
        LearnStaking: 'Learn about staking'
        StakedXrd: 'Stake your XRD on dashboard'
      }
    }
    MayaQuest: {
      title: 'Thorswap Quest'
      description: 'Learn about Thorswap and how to bridge tokens'
      introDescription: 'Thorswap is a decentralized exchange that allows you to swap tokens across different blockchains. Learn more about Thorswap and how to bridge tokens.'
      requirements: {
        MayaRouterWithdrawEvent: 'Do at least one bridge/swap of >$50 value'
      }
    }
    ReferralQuest: {
      title: 'Join Matt’s  Party Quest'
      description: 'Invite your friends to give them 200 RDR and also get 200 RDR yourself!'
      rewardsTitle: 'Party rewards Status'
      rewardTiersTab: 'Reward Tiers'
      partyParticipantsTab: 'Party participants'
      introDescription: 'You came to RadQuest following Matt’s link, join his party'
      requirements: {
        LearnAboutParty: 'Learn about Party Quest'
        ClaimReferralQuestRewards: 'Claim your rewards'
      }
    }
    SwapQuest: {
      requirements: {
        LearnAboutDexes: 'Learn about DEXes'
        SwapTokens: 'Swap tokens on DEXes'
      }
      title: 'Decentralized Exchange (DEX)'
      description: 'Learn how to swap one token for another at a changing market rate.'
      introDescription: 'Learn about DEXes\nSwap one token for another kind of token'
    }
    InstapassQuest: {
      requirements: {
        LearnAboutInstapass: 'Learn about Instapass'
        InstapassBadgeDeposited: 'Receive Instapass KYC badge'
      }
      title: 'Instapass'
      description: 'Learn about Instapass'
      introDescription: 'Instapass is a way to log in to websites without a password. Learn more about Instapass.'
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
