import twilio from 'twilio'
import { config } from '$lib/config'

export const twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken)

export const twilioService = twilioClient.verify.v2.services(config.twilio.serviceSid)
