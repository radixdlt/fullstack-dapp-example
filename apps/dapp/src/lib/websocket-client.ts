import { appLogger } from 'common'
import { env } from '$env/dynamic/public'
import type { Notification } from 'common'
import { authApi } from './api/auth-api'
import type { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'

export type WebSocketClient = ReturnType<typeof WebSocketClient>
export const WebSocketClient = ({
  authToken,
  radixDappToolkit,
  restartTimeout = 1000,
  maxRestartTimeout = 30_000,
  notificationUrl = env.PUBLIC_NOTIFICATION_URL,
  auth = authApi
}: {
  authToken: string
  radixDappToolkit: RadixDappToolkit
  auth?: typeof authApi
  restartTimeout?: number
  maxRestartTimeout?: number
  notificationUrl?: string
}) => {
  let currentRestartTimeout = restartTimeout
  let currentTimeout: ReturnType<typeof setTimeout> | undefined

  let shouldReconnect = true

  const onMessageCallbacks: ((data: Notification) => void)[] = []

  const createWebSocket = (authToken: string) => {
    appLogger.info('🛫 Starting WebSocket')
    const ws = new WebSocket(notificationUrl, ['Authorization', authToken])

    const onMessage = (event: MessageEvent<string>) => {
      const parsedData = JSON.parse(event.data)
      onMessageCallbacks.forEach((cb) => cb(parsedData))
    }

    const onOpen = () => {
      currentRestartTimeout = restartTimeout
      appLogger.debug('🟢 WebSocket started')
    }

    const onError = (event: Event) => {
      currentRestartTimeout =
        currentRestartTimeout >= maxRestartTimeout ? maxRestartTimeout : currentRestartTimeout * 2
      appLogger.error('🚩 WebSocket error', event)
    }

    const onClose = async () => {
      appLogger.debug('🔴 WebSocket closed')
      webSocket.removeEventListener('message', onMessage)
      webSocket.removeEventListener('close', onClose)
      webSocket.removeEventListener('error', onError)
      webSocket.removeEventListener('open', onOpen)

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
    onMessage: (callback: (data: Notification) => void): (() => void) => {
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
