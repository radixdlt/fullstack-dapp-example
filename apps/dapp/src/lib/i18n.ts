import i18next from 'i18next'
import { createI18nStore } from 'svelte-i18next'

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        quest_rewards: 'Rewards',
        quest_nextButton: 'Next',
        quest_keyImageAlt: 'Quest Image',
        quest_previousButton: 'Back',
        quest_placeholderNotFound: 'Placeholder {{id}} not found',

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

        glossary_back: 'Back'
      }
    }
  }
})

export const i18n = createI18nStore(i18next)
