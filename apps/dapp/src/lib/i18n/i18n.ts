import i18next from 'i18next'
import { createI18nStore } from 'svelte-i18next'
import enQuests from './locales/en/quests.json'
import enGlossary from './locales/en/glossary.json'
import enJetty from './locales/en/jetty.json'
import enMain from './locales/en/main.json'
import enTransformGems from './locales/en/transformGems.json'

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      quests: enQuests,
      glossary: enGlossary,
      jetty: enJetty,
      main: enMain,
      transformGems: enTransformGems
    }
  }
})

export const i18n = createI18nStore(i18next)
