import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { getRandomReferralCode } from './get-random-referral-code'

export const createUser =
  (db: PrismaClient) =>
  ({
    identityAddress,
    accountAddress,
    referredBy
  }: {
    identityAddress: string
    accountAddress: string
    referredBy?: string
  }) =>
    ResultAsync.fromPromise(
      db.user.create({
        data: {
          identityAddress,
          accountAddress,
          id: crypto.randomUUID().replace(/-/g, ''),
          referralCode: getRandomReferralCode(),
          referredBy
        }
      }),
      (error) => ({ reason: 'FailedToCreateUser', jsError: error })
    )
