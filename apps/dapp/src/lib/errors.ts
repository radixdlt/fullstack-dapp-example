export const OtpErrorCodes = {
  InvalidPhoneNumber: 'InvalidPhoneNumber',
  PhoneNumberExists: 'PhoneNumberExists',
  FailedToSendOtp: 'FailedToSendOtp',
  InvalidOtp: 'InvalidOtp',
  FailedToAddPhoneNumber: 'FailedToAddPhoneNumber',
  InvalidRequest: 'InvalidRequest'
} as const

export type OtpError = (typeof OtpErrorCodes)[keyof typeof OtpErrorCodes]
