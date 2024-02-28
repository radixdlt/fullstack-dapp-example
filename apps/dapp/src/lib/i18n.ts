import i18next from 'i18next'
import { createI18nStore } from 'svelte-i18next'

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        quest_rewards: 'Rewards',
        quest_requirements: 'What You Need to Do',
        quest_nextButton: 'Next',
        quest_keyImageAlt: 'Quest Image',
        quest_previousButton: 'Back',
        quest_placeholderNotFound: 'Placeholder {{id}} not found',
        quest_claimButton: 'Claim Your Reward',

        questOverview_minutesToComplete_one: '{{count}} minute',
        questOverview_minutesToComplete_other: '{{count}} minutes',

        transformGems_back: 'Back',
        transformGems_title_0: 'Pick a Transform card',
        transformGems_title_1: 'Pick two gems',
        transformGems_title_2: 'Ready to transform?',
        transformGems_next_button: 'Next',
        transformGems_complete_button: 'Send to Jetty',
        transformGems_gemcard_gemstone: 'Gemstone',
        transformGems_gemcard_rarity: 'Rarity',

        glossary_back: 'Back',

        verifyPhoneNumber_failedToSendOtp: 'Failed to send OTP',
        verifyPhoneNumber_phoneNumberExists: 'Phone number exists',
        verifyPhoneNumber_invalidPhoneNumber: 'Invalid phone number',
        verifyPhoneNumber_invalidOtp: 'Invalid one time password',
        verifyPhoneNumber_invalidRequest: 'Invalid request',
        verifyPhoneNumber_failedToAddPhoneNumber: 'Failed to add phone number'
      }
    }
  }
})

export const i18n = createI18nStore(i18next)
