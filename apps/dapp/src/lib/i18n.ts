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
        questOverview_minutesToComplete_other: '{{count}} minutes'
      }
    }
  }
})

export const i18n = createI18nStore(i18next)
