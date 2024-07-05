import { PrismaClient } from 'database'
import { ResultAsync } from 'neverthrow'
import { getRandomReferralCode } from './get-random-referral-code'
import { randomUUID } from 'node:crypto'

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
          id: randomUUID().replace(/-/g, ''),
          referralCode: getRandomReferralCode(),
          referredBy
        }
      }),
      (error) => ({ reason: 'FailedToCreateUser', jsError: error })
    )
