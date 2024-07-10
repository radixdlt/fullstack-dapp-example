import { Language } from '..'
import { LandingPopupDefinitions, landingPopupIds } from './landing-popup-definitions'
import LandingPopupIndex from './landing-popup-index.json'

export type LandingPopups = ReturnType<typeof loadLandingPopup>

export const loadLandingPopup = (language: Language) =>
  landingPopupIds.map((id) => {
    const landingPopupDefinition = LandingPopupDefinitions[id]
    const html = Object.values(LandingPopupIndex[id][language])[0]

    if (!landingPopupDefinition)
      throw new Error(`Language '${language}' is not supported for landing page`)

    return { id, ...landingPopupDefinition, html }
  })
