import { LandingPopupSchema } from './landing-popup-definitions'
import LandingPopupIndex from './landing-popup-index.json'

export type LandingPopups = ReturnType<typeof loadLandingPopup>

export const loadLandingPopup = (language: 'en') =>
  Object.values(LandingPopupSchema)
    .map((id) => {
      const html = LandingPopupIndex[id][language]['0.md']

      if (!html) throw new Error(`Language '${language}' is not supported for landing page`)

      return { id, html }
    })
    .reduce(
      (acc, { id, html }) => ({ ...acc, [id]: html }),
      {} as Record<LandingPopupSchema, string>
    )
