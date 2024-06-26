import { type ControllerDependencies, type ControllerMethodOutput } from '../_types'
import { Result, ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow'
import { safeParse, string } from 'valibot'
import { ErrorReason, createApiError, type ApiError } from '../../errors'
import parsePhoneNumber from 'libphonenumber-js'
import { sha256Hash } from './helpers/sha256Hash'
import Twilio from 'twilio'

const deriveCountryFromPhoneNumber = (value: string) => {
  const result = parsePhoneNumber(value)
  return result?.country
    ? ok(result?.country)
    : err({ reason: 'FailedToDeriveCountryFromPhoneNumber' })
}

export type OneTimePasswordController = ReturnType<typeof OneTimePasswordController>
export const OneTimePasswordController = ({
  userQuestModel,
  userModel,
  config,
  logger
}: ControllerDependencies) => {
  const twilioClient = Twilio(config.twilio.accountSid, config.twilio.authToken)
  const twilio = twilioClient.verify.v2.services(config.twilio.serviceSid)

  const validatePhoneNumber = (phoneNumber?: string): ResultAsync<string, ApiError> => {
    // TODO: Add phone number validation
    // https://github.com/jackocnr/intl-tel-input
    // https://www.twilio.com/en-us/blog/validate-phone-number-input
    const result = safeParse(string(), phoneNumber)

    return result.success
      ? okAsync(phoneNumber as string)
      : errAsync(createApiError(ErrorReason.failedToHashPhoneNumber, 500)())
  }

  const validateOtpInput = (oneTimePassword?: string, phoneNumber?: string) => {
    return ResultAsync.combine([
      validatePhoneNumber(phoneNumber),
      safeParse(string(), oneTimePassword).success
        ? okAsync(oneTimePassword)
        : errAsync(createApiError(ErrorReason.otpInvalidRequest, 400)())
    ])
  }

  const sendOneTimePassword = (phoneNumber: string) =>
    validatePhoneNumber(phoneNumber)
      .andThen((phoneNumber) =>
        sha256Hash(phoneNumber)
          .mapErr(() => createApiError(ErrorReason.failedToAddPhoneNumber, 400)())
          .asyncAndThen((hashOfPhoneNumber) => userModel.getPhoneNumber(hashOfPhoneNumber))
      )
      .andThen((phoneNumberExists) =>
        phoneNumberExists
          ? errAsync(createApiError(ErrorReason.phoneNumberExists, 400)())
          : ResultAsync.fromPromise(
              twilio.verifications.create({
                to: phoneNumber,
                channel: 'sms'
              }),
              (error) => {
                logger.error({ method: 'sendOneTimePassword.error', twilioError: error })
                return createApiError(ErrorReason.failedToSendOTP, 400)(error)
              }
            ).map((result) => ({ httpResponseCode: 200, data: { status: result.status } }))
      )

  const verifyOneTimePassword = (
    userId: string,
    phoneNumber: string,
    oneTimePassword: string
  ): ControllerMethodOutput =>
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
      .mapErr(() => createApiError(ErrorReason.failedToHashPhoneNumber, 400)())
      .andThen(([country, hashOfPhoneNumber]) =>
        userQuestModel
          .addVerifiedPhoneNumber(userId, country, hashOfPhoneNumber)
          .mapErr(() => createApiError(ErrorReason.failedToAddPhoneNumber, 400)())
      )
      .map(() => ({ data: { status: 'ok' }, httpResponseCode: 201 }))

  return { sendOneTimePassword, verifyOneTimePassword }
}
