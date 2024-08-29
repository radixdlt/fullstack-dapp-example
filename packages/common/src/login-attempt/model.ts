import { LoginAttemptType, type PrismaClient } from 'database'

import type { AppLogger } from '../helpers/logger'
import { ResultAsync } from 'neverthrow'
import { createApiError } from '../helpers'

type LoginData = {
  userId: string
  type: LoginAttemptType
  assessmentId: number
}

export type LoginAttemptModel = ReturnType<typeof LoginAttemptModel>

export const LoginAttemptModel = (db: PrismaClient) => (logger: AppLogger) => {
  const add = (loginData: LoginData) => {
    const dbData = {
      type: loginData.type,
      userId: loginData.userId,
      ipAssessmentId: loginData.assessmentId
    }
    logger.trace({ method: 'add', model: 'LoginAttempt', data: dbData })
    return ResultAsync.fromPromise(
      db.loginAttempt.create({
        data: dbData
      }),
      (error) => {
        logger?.error({ error, method: 'add', model: 'LoginAttempt' })
        return createApiError('FailedToAddLoginAttempt', 400)(error)
      }
    )
  }

  return { add }
}
