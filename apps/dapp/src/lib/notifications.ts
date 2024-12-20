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
      result.andThen((data) =>
        Object.keys(data).length === 0
          ? okAsync(undefined)
          : okAsync(jettyNotifications.update((n) => [...n, notifications[id]]))
      )
  )()

export const markLatestNotificationAsSeen = pipe(
  () =>
    fromSafePromise(new Promise<JettyNotification[]>((res) => jettyNotifications.subscribe(res))),
  (result) =>
    result.andThen((notifications) => {
      if (notifications.length === 0) return errAsync(Error('No notifications to mark as seen'))
      else
        return fromPromise(
          fetch(`/api/notification/${notifications[notifications.length - 1].id}/seen`, {
            method: 'POST'
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
        fetch(`/api/notification/${id}/seen`, {
          method: 'POST'
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

export const hasSeenNotification = (id: keyof typeof notifications) =>
  pipe(
    () =>
      fromPromise(
        fetch(`/api/notification/${id}/seen`, {
          method: 'GET'
        }),
        (e) => e as Error
      ),
    (result) =>
      result.andThen((response) => {
        if (!response.ok) return errAsync(Error('Failed to check if notification has been seen'))
        else return fromSafePromise(response.json())
      }),
    (result) =>
      result.map(({ hasSeen }) => {
        return hasSeen
      })
  )()

const notifications = {
  loggedIn: {
    id: 'loggedIn',
    title: 'Wallet Connected!',
    text: i18next.t('jetty:notifications.logged-in-with-wallet'),
    action: () => goto(`/home/basic/quest/${QuestDefinitions().SetupWallet.id}`)
  },
  clamsReceived: {
    id: 'clamsReceived',
    title: 'Clams Received!',
    text: i18next.t('jetty:notifications.received-clams'),
    action: () => goto(`/home/basic/quest/${QuestDefinitions().TransferTokens.id}`)
  },
  basicQuestsComplete: {
    id: 'basicQuestsComplete',
    title: 'Basic Quests Complete!',
    text: i18next.t('jetty:notifications.basic-quests-complete'),
    action: () => goto('/home/advanced')
  },
  joinedFriend: {
    id: 'joinedFriend',
    title: 'Join Your Friend!',
    text: i18next.t('jetty:notifications.join-friend'),
    action: () => goto(`/home/advanced/quest/${QuestDefinitions().JoinFriend.id}`)
  },
  reachedTierBronze: {
    id: 'reachedTierBronze',
    title: 'More Quest Friends!',
    text: i18next.t('jetty:notifications.new-tier'),
    action: () => goto(`/home/advanced/quest/${QuestDefinitions().QuestTogether.id}`)
  },
  reachedTierSilver: {
    id: 'reachedTierSilver',
    title: 'More Quest Friends!',
    text: i18next.t('jetty:notifications.new-tier'),
    action: () => goto(`/home/advanced/quest/${QuestDefinitions().QuestTogether.id}`)
  },
  reachedTierGold: {
    id: 'reachedTierGold',
    title: 'More Quest Friends!',
    text: i18next.t('jetty:notifications.new-tier'),
    action: () => goto(`/home/advanced/quest/${QuestDefinitions().QuestTogether.id}`)
  },
  reachedTierSuper: {
    id: 'reachedTierSuper',
    title: 'More Quest Friends!',
    text: i18next.t('jetty:notifications.new-tier'),
    action: () => goto(`/home/advanced/quest/${QuestDefinitions().QuestTogether.id}`)
  },
  jettySwapCompleted: {
    id: 'jettySwapCompleted',
    title: 'JettySwap Completed!',
    text: i18next.t('jetty:notifications.swap-completed'),
    action: () => goto(`/home/advanced/quest/${QuestDefinitions().DEXSwaps.id}`)
  },
  lettySwapCompleted: {
    id: 'lettySwapCompleted',
    title: 'LettySwap Completed!',
    text: i18next.t('jetty:notifications.swap-completed'),
    action: () => goto(`/home/advanced/quest/${QuestDefinitions().DEXSwaps.id}`)
  },
  stakeCompleted: {
    id: 'stakeCompleted',
    title: 'Stake Complete!',
    text: i18next.t('jetty:notifications.stake-completed'),
    action: () => goto(`/home/advanced/quest/${QuestDefinitions().NetworkStaking.id}`)
  },
  thorswapSwapCompleted: {
    id: 'thorswapSwapCompleted',
    title: 'Bridge Transaction Complete!',
    text: i18next.t('jetty:notifications.swap-completed'),
    action: () => goto(`/home/advanced/quests/${QuestDefinitions().Thorswap.id}`)
  },
  notEnoughXrd: {
    id: 'notEnoughXrd',
    title: 'Low on XRD',
    text: i18next.t('jetty:notifications.not-enough-xrd'),
    action: () => goto(`/home/basic/quest/${QuestDefinitions().GetStuff.id}#8`)
  }
} as const satisfies { [key: string]: JettyNotification }
