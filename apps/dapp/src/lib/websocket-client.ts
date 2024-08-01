import { appLogger } from 'common'
import { env } from '$env/dynamic/public'
import type { Message } from 'common'
import { authApi } from './api/auth-api'
import type { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import { messageApi as messageApiFn, type MessageApi } from './api/message-api'
import { writable } from 'svelte/store'

export type WebSocketClient = ReturnType<typeof WebSocketClient>
export const WebSocketClient = ({
  authToken,
  radixDappToolkit,
  restartTimeout = 1000,
  maxRestartTimeout = 30_000,
  notificationUrl = env.PUBLIC_NOTIFICATION_URL,
  auth = authApi,
  messageApi = messageApiFn
}: {
  authToken: string
  radixDappToolkit: RadixDappToolkit
  auth?: typeof authApi
  restartTimeout?: number
  maxRestartTimeout?: number
  notificationUrl?: string
  messageApi?: MessageApi
}) => {
  appLogger.debug({ method: 'webSocketClient.WebSocketClient', restartTimeout, maxRestartTimeout })
  let currentRestartTimeout = restartTimeout
  let currentTimeout: ReturnType<typeof setTimeout> | undefined

  let shouldReconnect = true

  const onMessageCallbacks: ((data: Message & { id: number }) => void)[] = []

  const sendMessagesToListeners = async () => {
    if (onMessageCallbacks.length)
      await messageApi.getAll().map((messages) => {
        appLogger.debug({
          method: 'webSocketClient.sendMessagesToListeners',
          listeners: onMessageCallbacks.length
        })
        onMessageCallbacks.forEach((callback) => {
          messages.forEach(callback)
        })
      })
  }

  const runPolling = async () => {
    while (shouldReconnect) {
      if (onMessageCallbacks.length > 0) await sendMessagesToListeners()
      await new Promise((resolve) => setTimeout(resolve, 15_000))
    }
  }

  runPolling()

  const createWebSocket = (authToken: string) => {
    appLogger.debug({ method: 'webSocketClient.createWebSocket' })
    const ws = new WebSocket(notificationUrl, ['Authorization', authToken])

    const onMessage = (event: MessageEvent<string>) => {
      const parsedData = JSON.parse(event.data)
      onMessageCallbacks.forEach((cb) => cb(parsedData))
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        appLogger.debug({ method: 'webSocketClient.handleVisibilityChange' })
        sendMessagesToListeners()
      }
    }

    const onOpen = async () => {
      currentRestartTimeout = restartTimeout
      appLogger.debug({ method: 'webSocketClient.onOpen' })
      document.addEventListener('visibilitychange', handleVisibilityChange)
      await sendMessagesToListeners()
    }

    const onError = () => {
      currentRestartTimeout =
        currentRestartTimeout >= maxRestartTimeout ? maxRestartTimeout : currentRestartTimeout * 2
      appLogger.error({ method: 'webSocketClient.onError' })
    }

    const onClose = async () => {
      appLogger.debug({ method: 'webSocketClient.onClose', shouldReconnect })
      webSocket.removeEventListener('message', onMessage)
      webSocket.removeEventListener('close', onClose)
      webSocket.removeEventListener('error', onError)
      webSocket.removeEventListener('open', onOpen)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (!shouldReconnect) return

      const result = await auth.authToken()

      if (result.isOk()) {
        currentTimeout = setTimeout(() => {
          webSocket = createWebSocket(result.value)
        }, currentRestartTimeout)
      } else {
        radixDappToolkit.disconnect()
      }
    }

    ws.onmessage = onMessage
    ws.onopen = onOpen
    ws.onerror = onError
    ws.onclose = onClose

    return ws
  }

  let webSocket = createWebSocket(authToken)

  return {
    onMessage: (callback: (data: Message & { id: number }) => void): (() => void) => {
      onMessageCallbacks.push(callback)
      return () => {
        const index = onMessageCallbacks.indexOf(callback)
        onMessageCallbacks.splice(index, 1)
      }
    },
    close: () => {
      clearTimeout(currentTimeout)
      shouldReconnect = false
      webSocket.close()
    }
  }
}

export const webSocketClient = writable<WebSocketClient | undefined>(undefined)
