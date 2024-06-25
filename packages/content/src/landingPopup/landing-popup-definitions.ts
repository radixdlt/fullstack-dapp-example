type Language = string

export type LandingPopupDefinition = Record<Language, { title: string }>

export enum LandingPopupId {
  Welcome = 'welcome'
}

export type LandingPopupDefinitions = Record<LandingPopupId, LandingPopupDefinition>

export const LandingPopupDefinitions: LandingPopupDefinitions = {
  [LandingPopupId.Welcome]: {
    en: { title: 'welcome' }
  }
}

export const landingPopupIds = Object.keys(LandingPopupDefinitions) as Array<
  keyof LandingPopupDefinitions
>
