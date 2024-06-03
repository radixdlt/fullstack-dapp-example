import { type ControllerMethodContext } from '../_types'
import { Result, ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import { safeParse, string } from 'valibot'
import { twilioService } from './twilioClient'
import { dbClient } from '$lib/db'
import { UserModel, UserQuestModel, sha256Hash } from 'common'
import { ErrorReason, createApiError, type ApiError } from '../../errors'
import parsePhoneNumber from 'libphonenumber-js'

const deriveCountryFromPhoneNumber = (value: string) => {
  const result = parsePhoneNumber(value)
  return result?.country
    ? ok(result?.country)
    : err({ reason: 'FailedToDeriveCountryFromPhoneNumber' })
}

export const OneTimePasswordController = ({
  userQuestModel = UserQuestModel(dbClient),
  userModel = UserModel(dbClient),
  twilio = twilioService
}: Partial<{
  userModel: UserModel
  userQuestModel: UserQuestModel
  twilio: typeof twilioService
}>) => {
  const validatePhoneNumber = (phoneNumber?: string): ResultAsync<string, ApiError> => {
    // TODO: Add phone number validation
    // https://github.com/jackocnr/intl-tel-input
    // https://www.twilio.com/en-us/blog/validate-phone-number-input
    const result = safeParse(string(), phoneNumber)

    return result.success
      ? okAsync(phoneNumber as string)
      : errAsync(createApiError(ErrorReason.invalidPhoneNumber, 400)())
  }

  const validateOtpInput = (oneTimePassword?: string, phoneNumber?: string) => {
    return ResultAsync.combine([
      validatePhoneNumber(phoneNumber),
      safeParse(string(), oneTimePassword).success
        ? okAsync(oneTimePassword)
        : errAsync(createApiError(ErrorReason.otpInvalidRequest, 400)())
    ])
  }

  const sendOneTimePassword = (ctx: ControllerMethodContext, phoneNumber: string) =>
    validatePhoneNumber(phoneNumber)
      .andThen((phoneNumber) =>
        sha256Hash(phoneNumber).asyncAndThen((hashOfPhoneNumber) =>
          userModel(ctx.logger).getPhoneNumber(hashOfPhoneNumber)
        )
      )
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
        Result.combine([deriveCountryFromPhoneNumber(phoneNumber), sha256Hash(phoneNumber)])
      )
      .andThen(([country, hashOfPhoneNumber]) =>
        userQuestModel(ctx.logger)
          .addVerifiedPhoneNumber(userId, country, hashOfPhoneNumber)
          .mapErr(() => createApiError(ErrorReason.failedToAddPhoneNumber, 400)())
      )
      .map(() => ({ data: { status: 'ok' }, httpResponseCode: 201 }))

  return { sendOneTimePassword, verifyOneTimePassword }
}

export const oneTimePasswordController = OneTimePasswordController({})
