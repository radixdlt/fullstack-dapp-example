import { PrismaClient } from 'database'
import { getRandomReferralCode } from 'common'

export const createUser =
  (db: PrismaClient) =>
  async (identityAddress: string, accountAddress: string, referredBy?: string) =>
    db.user.create({
      data: {
        identityAddress,
        accountAddress,
        id: crypto.randomUUID().replace(/-/g, ''),
        referralCode: getRandomReferralCode(),
        referredBy
      }
    })
