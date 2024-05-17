import i18next from 'i18next'
import { createI18nStore } from 'svelte-i18next'
import enMain from './locales/en/main.json'

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      main: enMain
    }
  }
})

export const i18n = createI18nStore(i18next)
