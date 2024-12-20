export type Challenge = { challenge: string; createdAt: Date }

export const AuthErrorReason = {
  TooManyUsers: 'TooManyUsers',
  FraudulentRequest: 'FraudulentRequest',
  FraudulentIp: 'FraudulentIp'
} as const
