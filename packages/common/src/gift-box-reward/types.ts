export const GiftBoxKind = {
  Starter: 'Starter',
  Simple: 'Simple',
  Fancy: 'Fancy',
  Elite: 'Elite'
} as const

export type GiftBoxKind = (typeof GiftBoxKind)[keyof typeof GiftBoxKind]
