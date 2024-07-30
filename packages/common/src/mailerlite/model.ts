import MailerLite from '@mailerlite/mailerlite-nodejs'
import { type AppLogger } from '../helpers'
import { ok, ResultAsync } from 'neverthrow'

export type MailerLiteModel = ReturnType<typeof MailerLiteModel>
export const MailerLiteModel =
  ({ apiKey }: { apiKey: string }) =>
  (logger: AppLogger) => {
    const groupId = '123854994345559323'
    const generalListGroupId = '51912940529386901'

    const mailerlite = new MailerLite({
      api_key: apiKey
    })

    const addOrUpdate = (
      email: string,
      {
        hasFinishedBasicQuests,
        newsletter
      }: { hasFinishedBasicQuests?: boolean; newsletter?: boolean } = {}
    ): ResultAsync<undefined, never> => {
      const groups = [groupId]
      if (newsletter) {
        groups.push(generalListGroupId)
      }
      return ResultAsync.fromPromise(
        mailerlite.subscribers.createOrUpdate({
          email,
          fields: hasFinishedBasicQuests
            ? {
                radquest_transfer_tokens: 'true'
              }
            : {},
          groups
        }),
        (jsError) => {
          logger.error({
            method: 'MailerLiteModel.addOrUpdate',
            email,
            newsletter,
            jsError,
            hasFinishedBasicQuests
          })
        }
      )
        .map(() => {
          logger.debug({
            method: 'MailerLiteModel.addOrUpdate',
            email,
            newsletter,
            hasFinishedBasicQuests
          })
          return undefined
        })
        .orElse(() => ok(undefined))
    }

    return { addOrUpdate, mailerlite }
  }
