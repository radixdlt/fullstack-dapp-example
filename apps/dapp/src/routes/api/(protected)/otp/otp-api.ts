import { fetchWrapper } from '$lib/helpers/fetch-wrapper'

export const OtpErrorCodes = {
  InvalidPhoneNumber: 'InvalidPhoneNumber',
  PhoneNumberExists: 'PhoneNumberExists',
  FailedToSendOtp: 'FailedToSendOtp',
  InvalidOtp: 'InvalidOtp',
  FailedToAddPhoneNumber: 'FailedToAddPhoneNumber',
  InvalidRequest: 'InvalidRequest'
} as const

export type OtpError = (typeof OtpErrorCodes)[keyof typeof OtpErrorCodes]

const sendOneTimePassword = (phoneNumber: string) =>
  fetchWrapper<{ status: 'pending' | 'approved' | 'cancelled' }, { message: OtpError }>(
    fetch('/api/otp/send', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber })
    })
  ).map(({ data }) => data)

const verifyOneTimePassword = (phoneNumber: string, oneTimePassword: string) =>
  fetchWrapper<{ status: 'ok' }, { message: OtpError }>(
    fetch('/api/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ oneTimePassword, phoneNumber })
    })
  ).map(({ data }) => data)

export const otpApi = {
  sendOneTimePassword,
  verifyOneTimePassword
} as const
