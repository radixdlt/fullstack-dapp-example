export type LandingPopupDefinition = {
  queryParamName: string
  queryParamValue?: string
}

export enum LandingPopupId {
  UserReferral = 'userreferral'
}

export const LandingPopupDefinitions = {
  [LandingPopupId.UserReferral]: {
    queryParamName: 'ref'
  }
}

export const landingPopupIds = Object.keys(LandingPopupDefinitions) as LandingPopupId[]
