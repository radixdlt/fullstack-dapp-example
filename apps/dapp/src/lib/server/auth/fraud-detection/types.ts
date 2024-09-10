export type FraudScoringInput = {
  ip: string
  userAgent: string
  acceptLanguage: string
  userId: string
}

export type IPQSResponse = {
  success: string | boolean
  message: string
  request_id: string
  errors?: string[]
  proxy?: boolean
  host?: string
  ISP?: string
  Organization?: string
  ASN?: number
  country_code?: string
  city?: string
  region?: string
  timezone?: string
  latitude?: number
  longitude?: number
  zip_code?: string
  is_crawler?: boolean
  connection_type?: string
  recent_abuse?: boolean
  abuse_velocity?: string
  bot_status?: boolean
  vpn?: boolean
  tor?: boolean
  active_vpn?: boolean
  active_tor?: boolean
  mobile?: boolean
  fraud_score?: number
  operating_system?: string
  browser?: string
  device_brand?: string
  device_model?: string
}

export const IPQS_OK_RESPONSE: IPQSResponse = {
  success: true,
  message: 'This is mock IPQS response in case of API failure',
  request_id: '',
  country_code: 'PL',
  fraud_score: 0,
  abuse_velocity: 'none',
  vpn: false,
  tor: false,
  proxy: false
}

export const IPQS_OK_RESULT = {
  response: IPQS_OK_RESPONSE,
  assessmentId: 1
}

export const FraudRule = {
  Farmer: 'Farmer',
  GoldenTicket: 'GoldenTicket',
  IPQSAggresive: 'IPQSAggresive',
  CountryBlocked: 'CountryBlocked',
  CountrySanctioned: 'CountrySanctioned'
} as const

export type FraudRule = (typeof FraudRule)[keyof typeof FraudRule]

export const FraudRuleStatus = {
  Passed: 'Passed',
  Unknown: 'Unknown',
  Rejected: 'Rejected'
} as const

export type FraudRuleStatus = (typeof FraudRuleStatus)[keyof typeof FraudRuleStatus]

export type FraudEvaluation = {
  [FraudRule.IPQSAggresive]: {
    status: FraudRuleStatus
    response: IPQSResponse
    assessmentId: number
  }
  [FraudRule.Farmer]: {
    status: FraudRuleStatus
    fraudScore: number
  }
  [FraudRule.CountrySanctioned]: {
    status: FraudRuleStatus
    countryCode: string
  }
  [FraudRule.CountryBlocked]: {
    status: FraudRuleStatus
    countryCode: string
  }
  [FraudRule.GoldenTicket]: {
    status: FraudRuleStatus
    data: void
  }
}

export type FraudEvaluationData<T extends FraudRule> = Exclude<FraudEvaluation[T], 'status'>
