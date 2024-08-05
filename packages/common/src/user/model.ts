import { ResultAsync, err, errAsync, okAsync } from 'neverthrow'
import type {
  PrismaClient,
  Prisma,
  User,
  UserPhoneNumber,
  UserEmail,
  CompletedQuestRequirement,
  QuestProgress,
  QuestStatus
} from 'database'
import { QuestTogetherConfig, type AppLogger } from '../'
import { type ApiError, createApiError } from '../helpers'
import { getRandomReferralCode } from './get-random-referral-code'

type GetByIdReturnType<T> = User & T extends { referredUsers: true }
  ? { referredUsers: User[] }
  : User

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
  ) => ResultAsync<GetByIdReturnType<T>, ApiError>
  getByIdentityAddress: <T extends Prisma.UserInclude<any>>(
    identityAddress: string,
    include: T
  ) => ResultAsync<GetByIdReturnType<T>, ApiError>
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
  setEmail: (userId: string, email: string, newsletter: boolean) => ResultAsync<UserEmail, ApiError>
  getUserIdsByIp: (ip: string) => ResultAsync<string[], ApiError>
  blockUsers: (userIds: string[]) => ResultAsync<undefined, ApiError>
  isPhoneNumberUsed: (userId: string) => ResultAsync<boolean, ApiError>
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
        db.userPhoneNumber.findMany({
          where: { ip },
          select: {
            userId: true
          }
        }),
        (error) => {
          logger?.error({ error, method: 'countByIp', model: 'UserModel' })
          return createApiError('failed to count by ip', 400)(error)
        }
      ).map((data) => data.map((user) => user.userId))
    }

    const blockUsers = (userIds: string[]) =>
      ResultAsync.fromPromise(
        db.user.updateMany({
          where: { id: { in: userIds } },
          data: {
            blocked: true
          }
        }),
        (error) => {
          logger?.error({ error, method: 'blockUsers', model: 'UserModel' })
          return createApiError('failed to block users', 400)()
        }
      ).map(() => undefined)

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
              questId: 'GetStuff',
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
          ? okAsync(data as unknown as GetByIdReturnType<T>)
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
          ? okAsync(data as unknown as GetByIdReturnType<T>)
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
                AND "QuestProgress"."questId" = ${QuestTogetherConfig.triggerRewardAfterQuest} 
                AND ("QuestProgress"."status" = 'COMPLETED' OR "QuestProgress"."status" = 'REWARDS_CLAIMED');
            `,
          (error) => {
            logger?.error({ error, method: 'getReferrals.raw', model: 'UserModel' })
            return 'failed to get referrals'
          }
        ),
        ResultAsync.fromPromise(
          db.referral.aggregate({
            where: { userId: id, action: 'DEC' },
            _sum: {
              xrdValue: true
            }
          }),
          (error) => {
            logger?.error({ error, method: 'getReferrals.referralXrd', model: 'UserModel' })
            return 'failed to get referralXrd'
          }
        ).map((result) => result._sum?.xrdValue?.toNumber() || 0),
        ResultAsync.fromPromise(
          db.referral.aggregate({
            where: { userId: id },
            _sum: {
              xrdValue: true
            }
          }),
          (error) => {
            logger?.error({ error, method: 'getReferrals.referralXrd', model: 'UserModel' })
            return 'failed to get referralXrd'
          }
        ).map((result) => result._sum?.xrdValue?.toNumber() || 0),
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
          ([referrals, claimed, readyToClaim, progress]: [
            { name: string }[],
            number,
            number,
            Record<string, QuestStatus>
          ]) =>
            ({
              referrals: referrals.map((referral: { name: string }) => referral.name),
              readyToClaim,
              claimed: claimed * -1,
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
          return createApiError('failed to set user email', 400)()
        }
      )

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
      blockUsers,
      getUserIdsByIp,
      getPhoneNumber,
      addAccount,
      setUserName,
      isAccountAddressUsed,
      getPhoneNumberByUserId,
      confirmReferralCode,
      setEmail,
      isPhoneNumberUsed
    }
  }
