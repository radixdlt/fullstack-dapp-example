import { jettyNotifications, type JettyNotification } from '../stores'
import i18next from 'i18next'
import { goto } from '$app/navigation'
import { QuestDefinitions } from 'content'
import pipe from 'ramda/src/pipe'
import { errAsync, fromPromise, fromSafePromise, okAsync } from 'neverthrow'

export const pushNotification = (id: keyof typeof notifications) =>
  pipe(
    () => fromPromise(fetch(`/api/notification/${id}`, { method: 'POST' }), (e) => e as Error),
    (result) =>
      result.andThen((response) => {
        if (!response.ok) return errAsync(Error('Failed to push notification'))
        else return fromSafePromise(response.json())
      }),
    (result) =>
      result.andThen(() => okAsync(jettyNotifications.update((n) => [...n, notifications[id]])))
  )()

export const markLatestNotificationAsSeen = pipe(
  () =>
    fromSafePromise(new Promise<JettyNotification[]>((res) => jettyNotifications.subscribe(res))),
  (result) =>
    result.andThen((notifications) => {
      if (notifications.length === 0) return errAsync(Error('No notifications to mark as seen'))
      else
        return fromPromise(
          fetch(`/api/notification/seen`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notificationId: notifications[notifications.length - 1].id })
          }),
          (e) => e as Error
        )
    }),
  (result) =>
    result.andThen((response) => {
      if (!response.ok) return errAsync(Error('Failed to mark notification as seen'))

      jettyNotifications.update((notifications) => notifications.slice(0, -1))
      return okAsync(response)
    })
)

export const markNotificationAsSeen = (id: keyof typeof notifications) =>
  pipe(
    () =>
      fromPromise(
        fetch(`/api/notification/seen`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notificationId: id })
        }),
        (e) => e as Error
      ),
    (result) =>
      result.andThen((response) => {
        if (!response.ok) return errAsync(Error('Failed to mark notification as seen'))

        jettyNotifications.update((notifications) => notifications.filter((n) => n.id !== id))
        return okAsync(response)
      })
  )()

export const loadUnseenNotifications = () =>
  pipe(
    () => fromPromise(fetch('/api/notification'), (e) => e as Error),
    (result) =>
      result.andThen((response) => {
        if (!response.ok) return errAsync(Error('Failed to fetch notifications'))
        else return fromSafePromise(response.json())
      }),
    (result) =>
      result.andThen((data) => {
        jettyNotifications.set(
          data.map(
            (n: { notificationId: keyof typeof notifications }) => notifications[n.notificationId]
          )
        )
        return okAsync(undefined)
      })
  )()

const notifications = {
  loggedIn: {
    id: 'loggedIn',
    text: i18next.t('jetty:logged-in-with-wallet'),
    onGoToQuest: () => goto(`/home/basic/quest/${QuestDefinitions().SetupWallet.id}#12 `)
  }
} as const satisfies { [key: string]: JettyNotification }
