import { ResultAsync, err, errAsync, okAsync } from 'neverthrow'
import {
  PrismaClient,
  Prisma,
  type User,
  type UserPhoneNumber,
  type CompletedQuestRequirement,
  type QuestProgress,
  type UserStatus,
  type QuestStatus
} from 'database'
import { BusinessLogic, type AppLogger } from '../'
import { type ApiError, createApiError } from '../helpers'
import { getRandomReferralCode } from './get-random-referral-code'

export type UserByReferralCode = User & {
  referredUsers: User[]
  questProgress: QuestProgress[]
  completedQuestRequirements: CompletedQuestRequirement[]
}

export type ReferralsState = {
  claimed: number
  readyToClaim: number
  referrals: string[]
  progress: Record<string, QuestStatus>
}

type UserModelType = {
  doesUserExist: (identityAddress: string) => ResultAsync<boolean, ApiError>
  create: (identityAddress: string, referredBy?: string) => ResultAsync<User, ApiError>
  getById: <T extends Prisma.UserInclude<any>>(
    id: string,
    include: T
  ) => ResultAsync<Prisma.UserGetPayload<{ include: T }>, ApiError>
  getByIdentityAddress: <T extends Prisma.UserInclude<any>>(
    identityAddress: string,
    include: T
  ) => ResultAsync<Prisma.UserGetPayload<{ include: T }>, ApiError>
  getByAccountAddress: <T extends Prisma.UserInclude<any>>(
    accountAddress: string,
    include: T
  ) => ResultAsync<User | null, ApiError>
  isAccountAddressUsed: (accountAddress: string) => ResultAsync<boolean, ApiError>
  getByReferralCode: (referralCode: string) => ResultAsync<UserByReferralCode, ApiError>
  getReferrals: (id: string) => ResultAsync<ReferralsState, ApiError>
  getPhoneNumber: (phoneNumber: string) => ResultAsync<UserPhoneNumber | null, ApiError>
  addAccount: (userId: string, accountAddress: string) => ResultAsync<void, ApiError>
  setUserName: (userId: string, name: string) => ResultAsync<User, ApiError>
  getPhoneNumberByUserId: (userId: string) => ResultAsync<string | undefined, ApiError>
  confirmReferralCode: (referralCode: string) => ResultAsync<string | undefined, ApiError>
  setEmail: (userId: string, email: string, newsletter: boolean) => ResultAsync<undefined, ApiError>
  getUserIdsByIp: (ip: string) => ResultAsync<string[], ApiError>
  setUserStatus: (userId: string, status: UserStatus) => ResultAsync<undefined, ApiError>
  isPhoneNumberUsed: (userId: string) => ResultAsync<boolean, ApiError>
  countReferralCodeUsagePerIp: (userId: string, ip: string) => ResultAsync<number, ApiError>
}

export type UserModel = ReturnType<typeof UserModel>
export const UserModel =
  (db: PrismaClient) =>
  (logger: AppLogger): UserModelType => {
    const doesUserExist = (identityAddress: string) =>
      ResultAsync.fromPromise(
        db.user.count({ where: { identityAddress } }).then((count) => count > 0),
        (error) => {
          logger?.error({ error, method: 'createUser', model: 'UserModel' })
          return createApiError('failed to create user', 400)()
        }
      )

    const create = (identityAddress: string, referredBy?: string): ResultAsync<User, ApiError> => {
      return ResultAsync.fromPromise<User, ApiError>(
        db.user.upsert({
          create: {
            identityAddress,
            referredBy,
            referralCode: getRandomReferralCode()
          },
          update: {},
          where: { identityAddress }
        }),
        (error) => {
          logger?.error({ error, method: 'createUser', model: 'UserModel' })
          return createApiError('failed to create user', 400)(error)
        }
      ).orElse((data) => {
        const prismaError = data?.jsError as Prisma.PrismaClientKnownRequestError
        const prismaErrorMetaTarget = Array.isArray(prismaError?.meta?.target)
          ? prismaError?.meta?.target
          : []
        if (
          prismaError &&
          prismaError.code === 'P2002' &&
          prismaErrorMetaTarget.includes('referralCode')
        ) {
          return create(identityAddress, referredBy)
        }

        return err(data)
      })
    }

    const getUserIdsByIp = (ip: string) => {
      return ResultAsync.fromPromise(
        db.$queryRaw<{ userId: string }[]>`
      SELECT "userId" FROM "LoginAttempt" 
        WHERE "ipAssessmentId" IN (SELECT id FROM "IpAssessment" WHERE ip = ${ip}) 
        AND "type" = 'USER_CREATED'
        AND "createdAt" > NOW() - interval '24 hours'
      `,
        (error) => {
          logger?.error({ error, method: 'countByIp', model: 'UserModel' })
          return createApiError('failed to count by ip', 400)(error)
        }
      ).map((data) => data.map((user) => user.userId))
    }

    const countReferralCodeUsagePerIp = (userId: string, ip: string) =>
      ResultAsync.fromPromise(
        db.$queryRaw<{ count: number }[]>`
          SELECT COUNT(1) FROM "User" u
            INNER JOIN "LoginAttempt" la
              ON u.id = la."userId" 
              AND la."createdAt" > NOW() - INTERVAL '30 minutes'
              AND la."type" = 'USER_CREATED'
            INNER JOIN "IpAssessment" ia
              ON la."ipAssessmentId" = ia.id 
              AND ia."ip" = ${ip}
            WHERE "referredBy" = (SELECT "referralCode" FROM "User" WHERE id = ${userId});
          `,
        (error) => {
          logger?.error({
            error,
            method: 'countReferralCodeUsagePerIp',
            model: 'UserModel'
          })
          return createApiError('failed to count referral code usage', 500)(error)
        }
      ).map((data) => data[0].count || 0)

    const setUserStatus = (userId: string, status: UserStatus) => {
      return ResultAsync.fromPromise(
        db.user.update({
          where:
            status === 'PERMANENTLY_BLOCKED'
              ? { id: userId }
              : {
                  id: userId,
                  status: { in: ['TEMPORARILY_BLOCKED', 'OK'] }
                },
          data: {
            status
          }
        }),
        (error) => {
          logger?.error({ error, method: 'setUsersBlockedStatus', model: 'UserModel' })
          return createApiError('failed to block users', 400)()
        }
      ).map(() => undefined)
    }

    const addAccount = (userId: string, accountAddress: string) =>
      ResultAsync.fromPromise(
        db.$transaction([
          db.user.update({
            where: { id: userId },
            data: {
              accountAddress
            }
          }),
          db.completedQuestRequirement.create({
            data: {
              userId: userId,
              questId: 'SetupWallet',
              requirementId: 'RegisterAccount'
            }
          })
        ]),
        (error) => {
          logger?.error({ error, method: 'addAccount', model: 'UserModel' })
          return createApiError('failed to add account', 400)()
        }
      ).map(() => undefined)

    const getById = <T extends Prisma.UserInclude<any>>(id: string, include: T) =>
      ResultAsync.fromPromise(
        db.user.findUnique({
          where: { id },
          include
        }),
        (error) => {
          logger?.error({ error, method: 'getById', where: { id }, model: 'UserModel' })
          return createApiError('failed to get user', 400)()
        }
      ).andThen((data) =>
        data
          ? okAsync(data as unknown as Prisma.UserGetPayload<{ include: T }>)
          : errAsync(createApiError('user not found', 404)())
      )

    const getByIdentityAddress = <T extends Prisma.UserInclude<any>>(
      identityAddress: string,
      include: T
    ) =>
      ResultAsync.fromPromise(
        db.user.findUnique({
          where: { identityAddress },
          include
        }),
        (error) => {
          logger?.error({
            error,
            method: 'getByIdentityAddress',
            where: { identityAddress },
            model: 'UserModel'
          })
          return createApiError('failed to get user', 400)()
        }
      ).andThen((data) =>
        data
          ? okAsync(data as unknown as Prisma.UserGetPayload<{ include: T }>)
          : errAsync(createApiError('user not found', 404)())
      )

    const isAccountAddressUsed = (accountAddress: string) =>
      ResultAsync.fromPromise(
        db.user.count({
          where: { accountAddress }
        }),
        (error) => {
          logger?.error({ error, method: 'isAccountAddressUsed', model: 'UserModel' })
          return createApiError('failed to check if account address is used', 400)()
        }
      ).map((count) => count > 0)

    const isPhoneNumberUsed = (userId: string) =>
      ResultAsync.fromPromise(
        db.userPhoneNumber.count({
          where: { userId }
        }),
        (error) => {
          logger?.error({ error, method: 'isPhoneNumberUsed', model: 'UserModel' })
          return createApiError('failed to check if phone number is used', 400)()
        }
      ).map((count) => count > 0)

    const getByAccountAddress = <T extends Prisma.UserInclude<any>>(
      accountAddress: string,
      include: T
    ) =>
      ResultAsync.fromPromise(
        db.user.findFirst({
          where: { accountAddress },
          include
        }),
        (error) => {
          logger?.error({
            error,
            method: 'getByAccountAddress',
            where: { accountAddress },
            model: 'UserModel'
          })
          return createApiError('failed to get user', 400)()
        }
      ).andThen((data) =>
        data ? okAsync(data) : errAsync(createApiError('user not found', 404)())
      )
    const getReferrals = (id: string) =>
      ResultAsync.combineWithAllErrors([
        ResultAsync.fromPromise(
          db.$queryRaw`
            SELECT "name" FROM "User" 
              INNER JOIN "QuestProgress" ON "User".id = "QuestProgress"."userId"
              WHERE 
              "User"."referredBy" = (SELECT "referralCode" FROM "User" WHERE id = ${id})
                AND "QuestProgress"."questId" = ${BusinessLogic.QuestTogether.triggerRewardAfterQuest} 
                AND ("QuestProgress"."status" = 'COMPLETED' OR "QuestProgress"."status" = 'REWARDS_CLAIMED');
            `,
          (error) => {
            logger?.error({ error, method: 'getReferrals.raw', model: 'UserModel' })
            return 'failed to get referrals'
          }
        ),
        ResultAsync.fromPromise(
          db.questProgress.findMany({
            where: { userId: id, questId: { startsWith: 'QuestTogether:' } }
          }),
          (error) => {
            logger?.error({ error, method: 'getReferrals.questProgress', model: 'UserModel' })
            return 'failed to get referralXrd'
          }
        ).map((progress) =>
          (progress || []).reduce(
            (acc, curr) => {
              acc[curr.questId.split(':')[1]] = curr.status
              return acc
            },
            {} as Record<string, QuestStatus>
          )
        )
      ])
        .map(
          ([referrals, progress]: [{ name: string }[], Record<string, QuestStatus>]) =>
            ({
              referrals: referrals.map((referral: { name: string }) => referral.name),
              progress
            }) as ReferralsState
        )
        .mapErr((jsError) => createApiError('failed to get referrals', 400)(jsError))

    const getByReferralCode = (referralCode: string) =>
      ResultAsync.fromPromise(
        db.user.findUnique({
          where: { referralCode },
          include: {
            referredUsers: true,
            questProgress: true,
            completedQuestRequirements: true
          }
        }),
        (error) => {
          logger?.error({
            error,
            method: 'getByReferralCode',
            where: { referralCode },
            model: 'UserModel'
          })
          return createApiError('failed to get user by referral code', 400)()
        }
      ).andThen((data) =>
        data
          ? okAsync(data as UserByReferralCode)
          : errAsync(createApiError('user not found by referral code', 404)())
      )

    const getPhoneNumber = (phoneNumber: string): ResultAsync<UserPhoneNumber | null, ApiError> =>
      ResultAsync.fromPromise<UserPhoneNumber | null, ApiError>(
        db.userPhoneNumber.findFirst({
          where: { phoneNumber }
        }),
        (error) => {
          logger?.error({ error, method: 'getPhoneNumber', model: 'UserModel' })
          return createApiError('failed to get phone number', 400)()
        }
      )

    const setUserName = (userId: string, name: string) =>
      ResultAsync.fromPromise(
        db.user.update({
          where: { id: userId },
          data: { name }
        }),
        (error) => {
          logger?.error({ error, method: 'setUserName', model: 'UserModel' })
          return createApiError('failed to set user name', 400)()
        }
      )

    const setEmail = (userId: string, email: string, newsletter: boolean) =>
      ResultAsync.fromPromise(
        db.userEmail.findFirst({
          where: {
            email
          }
        }),
        (e) => {
          logger?.error({ error: e, method: 'setEmail', model: 'UserModel' })
          return createApiError('failed to count user email', 400)()
        }
      )
        .andThen((existingEmail) =>
          existingEmail && existingEmail.userId === userId
            ? ResultAsync.fromPromise(
                db.userEmail.upsert({
                  create: {
                    userId,
                    email,
                    newsletter
                  },
                  update: {
                    email,
                    newsletter
                  },
                  where: { userId }
                }),
                (error) => {
                  logger?.error({ error, method: 'setEmail', model: 'UserModel' })

                  return createApiError('failed to set user email', 400)(error)
                }
              )
            : okAsync(undefined)
        )
        .map(() => undefined)

    const getPhoneNumberByUserId = (userId: string): ResultAsync<string | undefined, ApiError> =>
      ResultAsync.fromPromise(db.userPhoneNumber.findFirst({ where: { userId } }), (error) => {
        logger?.error({ error, method: 'getPhoneNumberByUserId', model: 'UserModel' })
        return createApiError('failed to get phone number', 400)()
      }).map((data) => data?.phoneNumber)

    const confirmReferralCode = (referralCode: string) =>
      ResultAsync.fromPromise(
        db.user.count({
          where: {
            referralCode
          }
        }),
        (error) => {
          logger?.error({ error, method: 'confirmReferralCode', model: 'UserModel' })
          return createApiError('failed to find user by referral code', 400)()
        }
      ).map((data) => (data ? referralCode : undefined))

    return {
      doesUserExist,
      create,
      getById,
      getByIdentityAddress,
      getByAccountAddress,
      getByReferralCode,
      getReferrals,
      setUserStatus,
      getUserIdsByIp,
      getPhoneNumber,
      addAccount,
      countReferralCodeUsagePerIp,
      setUserName,
      isAccountAddressUsed,
      getPhoneNumberByUserId,
      confirmReferralCode,
      setEmail,
      isPhoneNumberUsed
    }
  }
