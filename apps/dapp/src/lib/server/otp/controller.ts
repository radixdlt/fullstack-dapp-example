import {
  createApiError,
  type ControllerMethodContext,
  type ApiError,
  type ControllerMethodOutput
} from '../_types'
import { UserModel } from '../user/model'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import z from 'zod'
import { twilioService } from './twilioClient'
import { OtpErrorCodes } from '../../errors'
import { dbClient } from '$lib/db'
import { UserQuestModel } from 'common'

export const OneTimePasswordController = ({
  userQuestModel = UserQuestModel(dbClient),
  userModel = UserModel(),
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
    return ResultAsync.fromPromise(z.string().safeParseAsync(phoneNumber), () =>
      createApiError(OtpErrorCodes.InvalidPhoneNumber, 400)()
    ).map(() => phoneNumber as string)
  }

  const validateOtpInput = (oneTimePassword?: string, phoneNumber?: string) => {
    return ResultAsync.combine([
      validatePhoneNumber(phoneNumber),
      ResultAsync.fromPromise(z.string().safeParseAsync(oneTimePassword), () =>
        createApiError(OtpErrorCodes.InvalidRequest, 400)()
      )
    ])
  }

  const sendOneTimePassword = (
    ctx: ControllerMethodContext,
    phoneNumber: string
  ): ControllerMethodOutput<{ status: string }> =>
    validatePhoneNumber(phoneNumber)
      .andThen((phoneNumber) => userModel(ctx.logger).getPhoneNumber(phoneNumber))
      .andThen((phoneNumberExists) =>
        phoneNumberExists
          ? errAsync(createApiError(OtpErrorCodes.PhoneNumberExists, 400)())
          : ResultAsync.fromPromise<{ status: string }, ApiError>(
              twilio.verifications.create({
                to: phoneNumber,
                channel: 'sms'
              }),
              () => createApiError(OtpErrorCodes.FailedToSendOtp, 400)()
            ).map((result) => ({ httpResponseCode: 200, data: { status: result.status } }))
      )

  const verifyOneTimePassword = (
    ctx: ControllerMethodContext,
    userId: string,
    phoneNumber: string,
    oneTimePassword: string
  ): ControllerMethodOutput<{ status: string }> =>
    validateOtpInput(phoneNumber, oneTimePassword)
      .andThen(() =>
        ResultAsync.fromPromise<{ valid: boolean }, ApiError>(
          twilio.verificationChecks.create({
            to: phoneNumber,
            code: oneTimePassword
          }),
          () => createApiError(OtpErrorCodes.InvalidOtp, 400)()
        )
      )
      .andThen(({ valid }) =>
        valid ? okAsync({}) : errAsync(createApiError(OtpErrorCodes.InvalidOtp, 400)())
      )
      .andThen(() =>
        userQuestModel(ctx.logger)
          .addVerifiedPhoneNumber(userId, phoneNumber)
          .mapErr(() => createApiError(OtpErrorCodes.FailedToAddPhoneNumber, 400)())
      )
      .map(() => ({ data: { status: 'ok' }, httpResponseCode: 201 }))

  return { sendOneTimePassword, verifyOneTimePassword }
}

export const oneTimePasswordController = OneTimePasswordController({})
