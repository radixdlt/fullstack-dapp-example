import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'
import { twilioService } from '../twilioClient'
import { dbClient } from '$lib/db'
import { OtpErrorCodes } from '../otp-api'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }) => {
  const requestBody = await request.json()

  if (!requestBody.phoneNumber) {
    // TODO: Add phone number validation
    // https://github.com/jackocnr/intl-tel-input
    // https://www.twilio.com/en-us/blog/validate-phone-number-input

    return error(400, OtpErrorCodes.InvalidPhoneNumber)
  }

  const phoneNumberExists = await dbClient.userPhoneNumber.findFirst({
    where: { phoneNumber: requestBody.phoneNumber }
  })

  if (phoneNumberExists) {
    return error(400, OtpErrorCodes.PhoneNumberExists)
  }

  try {
    const result = await twilioService.verifications.create({
      to: requestBody.phoneNumber,
      channel: 'sms'
    })

    return json({ status: result.status })
  } catch (e) {
    return error(400, OtpErrorCodes.FailedToSendOtp)
  }
}
