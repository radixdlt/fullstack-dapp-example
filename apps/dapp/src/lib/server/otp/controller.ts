import { type ControllerMethodContext } from '../_types'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import z from 'zod'
import { twilioService } from './twilioClient'
import { dbClient } from '$lib/db'
import { UserModel, UserQuestModel } from 'common'
import { ErrorReason, createApiError, type ApiError } from '../../errors'

export const OneTimePasswordController = ({
  userQuestModel = UserQuestModel(dbClient),
  userModel = UserModel(dbClient),
  twilio = twilioService
}: Partial<{
  userModel: UserModel
  userQuestModel: UserQuestModel
  twilio: typeof twilioService
}>) => {
  const validatePhoneNumber = (phoneNumber?: string) => {
    // TODO: Add phone number validation
    // https://github.com/jackocnr/intl-tel-input
    // https://www.twilio.com/en-us/blog/validate-phone-number-input
    return ResultAsync.fromPromise(
      z.string().safeParseAsync(phoneNumber),
      createApiError(ErrorReason.invalidPhoneNumber, 400)
    ).map(() => phoneNumber as string)
  }

  const validateOtpInput = (oneTimePassword?: string, phoneNumber?: string) => {
    return ResultAsync.combine([
      validatePhoneNumber(phoneNumber),
      ResultAsync.fromPromise(z.string().safeParseAsync(oneTimePassword), () =>
        createApiError(ErrorReason.otpInvalidRequest, 400)()
      )
    ])
  }

  const sendOneTimePassword = (ctx: ControllerMethodContext, phoneNumber: string) =>
    validatePhoneNumber(phoneNumber)
      .andThen((phoneNumber) => userModel(ctx.logger).getPhoneNumber(phoneNumber))
      .andThen((phoneNumberExists) =>
        phoneNumberExists
          ? errAsync(createApiError(ErrorReason.phoneNumberExists, 400)())
          : ResultAsync.fromPromise(
              twilio.verifications.create({
                to: phoneNumber,
                channel: 'sms'
              }),
              createApiError(ErrorReason.failedToSendOTP, 400)
            ).map((result) => ({ httpResponseCode: 200, data: { status: result.status } }))
      )

  const verifyOneTimePassword = (
    ctx: ControllerMethodContext,
    userId: string,
    phoneNumber: string,
    oneTimePassword: string
  ) =>
    validateOtpInput(phoneNumber, oneTimePassword)
      .andThen(() =>
        ResultAsync.fromPromise<{ valid: boolean }, ApiError>(
          twilio.verificationChecks.create({
            to: phoneNumber,
            code: oneTimePassword
          }),
          () => createApiError(ErrorReason.invalidOTP, 400)()
        )
      )
      .andThen(({ valid }) =>
        valid ? okAsync({}) : errAsync(createApiError(ErrorReason.invalidOTP, 400)())
      )
      .andThen(() =>
        userQuestModel(ctx.logger)
          .addVerifiedPhoneNumber(userId, phoneNumber)
          .mapErr(() => createApiError(ErrorReason.failedToAddPhoneNumber, 400)())
      )
      .map(() => ({ data: { status: 'ok' }, httpResponseCode: 201 }))

  return { sendOneTimePassword, verifyOneTimePassword }
}

export const oneTimePasswordController = OneTimePasswordController({})
