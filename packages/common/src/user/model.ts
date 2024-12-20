import { ResultAsync, err, errAsync, okAsync } from 'neverthrow'
import {
  PrismaClient,
  Prisma,
  type User,
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
  addAccount: (userId: string, accountAddress: string) => ResultAsync<void, ApiError>
  setUserName: (userId: string, name: string) => ResultAsync<User, ApiError>
  confirmReferralCode: (referralCode: string) => ResultAsync<string | undefined, ApiError>
  setUserStatus: (userId: string, status: UserStatus) => ResultAsync<undefined, ApiError>
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
          console.log(error)
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
      addAccount,
      setUserName,
      isAccountAddressUsed,
      confirmReferralCode
    }
  }
