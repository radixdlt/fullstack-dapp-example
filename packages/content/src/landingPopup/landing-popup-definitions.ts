export type LandingPopupDefinition = {
  queryParamName: string
  queryParamValue?: string
}

export enum LandingPopupId {
  UserReferral = 'userreferral',
  m_TestKOL = 'm_testkol',
  m_TestPaidAd = 'm_testpaidad'
}

export const LandingPopupDefinitions = {
  [LandingPopupId.UserReferral]: {
    queryParamName: 'ref'
  },
  [LandingPopupId.m_TestKOL]: {
    queryParamName: 'utm',
    queryParamValue: 'testkol'
  },
  [LandingPopupId.m_TestPaidAd]: {
    queryParamName: 'utm',
    queryParamValue: 'm_testpaidad'
  }
}

export const landingPopupIds = Object.keys(LandingPopupDefinitions) as LandingPopupId[]
