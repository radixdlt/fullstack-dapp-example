import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { getRandomReferralCode } from './get-random-referral-code'
import { v4 } from 'uuid'

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
          id: v4().replace(/-/g, ''),
          referralCode: getRandomReferralCode(),
          referredBy
        }
      }),
      (error) => ({ reason: 'FailedToCreateUser', jsError: error })
    )
