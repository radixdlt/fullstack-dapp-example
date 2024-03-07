import { fetchWrapper } from '$lib/helpers/fetch-wrapper'
import type { OtpError } from '$lib/errors'

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
