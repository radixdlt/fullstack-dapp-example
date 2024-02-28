import { appLogger } from '$lib/helpers/logger'
import { dbClient } from '$lib/db'
import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'
import { twilioService } from '../twilioClient'
import { OtpErrorCodes } from '../otp-api'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals }) => {
  const requestBody = await request.json()

  if (!requestBody.phoneNumber || !requestBody.oneTimePassword)
    return error(400, OtpErrorCodes.InvalidRequest)

  try {
    const status = await twilioService.verificationChecks.create({
      to: requestBody.phoneNumber,
      code: requestBody.oneTimePassword
    })

    if (!status.valid) {
      return error(400, OtpErrorCodes.InvalidOtp)
    }
  } catch (e) {
    return error(400, OtpErrorCodes.InvalidOtp)
  }

  try {
    await dbClient.userPhoneNumber.create({
      data: {
        userId: locals.userId,
        phoneNumber: requestBody.phoneNumber
      }
    })
    // TODO: add requirement fulfilled DB entry in the same transaction
  } catch (e) {
    appLogger.error({ method: 'otp.verify', error: e })
    return error(400, OtpErrorCodes.FailedToAddPhoneNumber)
  }

  return json({ status: 'ok' })
}
