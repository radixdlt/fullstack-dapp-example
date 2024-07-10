import MailerLite from '@mailerlite/mailerlite-nodejs'
import { type AppLogger, createApiError } from '../helpers'
import { ResultAsync } from 'neverthrow'

export type MailerLiteModel = ReturnType<typeof MailerLiteModel>
export const MailerLiteModel =
  ({ apiKey }: { apiKey: string }) =>
  (logger: AppLogger) => {
    const groupId = '123854994345559323'

    const mailerlite = new MailerLite({
      api_key: apiKey
    })

    const addOrUpdate = (
      email: string,
      { hasFinishedBasicQuests }: { hasFinishedBasicQuests?: boolean } = {}
    ) => {
      return ResultAsync.fromPromise(
        mailerlite.subscribers.createOrUpdate({
          email,
          fields: hasFinishedBasicQuests
            ? {
                radquest_transfer_tokens: 'true'
              }
            : {},
          groups: [groupId]
        }),
        createApiError('failed to add subscriber to mailerlite', 500)
      ).map((data) => {
        logger.debug({ method: 'MailerLiteModel.addOrUpdate', email, hasFinishedBasicQuests })
        return data
      })
    }

    return { addOrUpdate, mailerlite }
  }
