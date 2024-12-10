export const LandingPopupSchema = {
  Ticket: 'ticket',
  UserReferral: 'userreferral',
  Influencer: 'influencer',
  Paid: 'paid'
} as const

export type LandingPopupSchema = (typeof LandingPopupSchema)[keyof typeof LandingPopupSchema]

export const UtmSourceLanding = {
  'Twitter-geo1a': { schema: LandingPopupSchema.Paid, data: { source: 'X' } },
} as const
