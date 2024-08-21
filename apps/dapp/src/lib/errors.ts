import type { NumericRange } from '@sveltejs/kit'

export const APIError = {
  failedToSaveProgress: 'failedToSaveProgress',
  failedToCreateUser: 'failedToCreateUser',
  failedToGetUser: 'failedToGetUser',
  userNotFound: 'userNotFound',
  requestStatusNotOk: 'requestStatusNotOk',
  failedToFetch: 'failedToFetch'
} as const

export const DBError = {
  requirementsNotMet: 'requirementsNotMet',
  preRequisiteNotMet: 'preRequisiteNotMet',
  questAlreadyCompleted: 'questAlreadyCompleted',
  invalidRequirement: 'invalidRequirement',
  accountAddressNotSet: 'accountAddressNotSet'
} as const

export const ErrorReason = {
  ...APIError,
  ...DBError
}

export type ApiError = ReturnType<ReturnType<typeof createApiError>>

export const createApiError =
  (reason: keyof typeof ErrorReason, httpResponseCode: NumericRange<400, 599>) =>
  (
    jsError?: any
  ): {
    jsError?: Error
    httpResponseCode: NumericRange<400, 599>
    reason: keyof typeof ErrorReason
  } => ({
    jsError,
    httpResponseCode,
    reason
  })
