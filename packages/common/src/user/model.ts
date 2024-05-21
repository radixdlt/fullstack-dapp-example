import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import type { PrismaClient, Prisma, User, UserPhoneNumber } from 'database'
import type { AppLogger } from '../'
import { type ApiError, createApiError } from '../helpers'

type UserModelType = {
  create: (identityAddress: string) => ResultAsync<User, ApiError>
  getById: <T extends Prisma.UserInclude<any>>(
    id: string,
    include: T
  ) => ResultAsync<User | null, ApiError>
  getPhoneNumber: (phoneNumber: string) => ResultAsync<UserPhoneNumber | null, ApiError>
  addAccount: (userId: string, accountAddress: string) => ResultAsync<void, ApiError>
  setUserName: (userId: string, name: string) => ResultAsync<User, ApiError>
  getPhoneNumberByUserId: (userId: string) => ResultAsync<string | undefined, ApiError>
}
export type UserModel = ReturnType<typeof UserModel>
export const UserModel =
  (db: PrismaClient) =>
  (logger: AppLogger): UserModelType => {
    const create = (identityAddress: string): ResultAsync<User, ApiError> =>
      ResultAsync.fromPromise<User, ApiError>(
        db.user.upsert({
          create: { identityAddress },
          update: {},
          where: { identityAddress }
        }),
        (error) => {
          logger?.error({ error, method: 'createUser', model: 'UserModel' })
          return createApiError('failed to create user', 400)()
        }
      )

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
              questId: 'LoginWithWallet',
              requirementId: 'ConnectAccount'
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
          logger?.error({ error, method: 'getById', model: 'UserModel' })
          return createApiError('failed to get user', 400)()
        }
      ).andThen((data) =>
        data ? okAsync(data) : errAsync(createApiError('user not found', 404)())
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

    const getPhoneNumberByUserId = (userId: string): ResultAsync<string | undefined, ApiError> =>
      ResultAsync.fromPromise(db.userPhoneNumber.findFirst({ where: { userId } }), (error) => {
        logger?.error({ error, method: 'getPhoneNumberByUserId', model: 'UserModel' })
        return createApiError('failed to get phone number', 400)()
      }).map((data) => data?.phoneNumber)

    return { create, getById, getPhoneNumber, addAccount, setUserName, getPhoneNumberByUserId }
  }
