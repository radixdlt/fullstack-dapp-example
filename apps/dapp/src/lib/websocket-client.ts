import { appLogger } from 'common'
import { env } from '$env/dynamic/public'
import type { Notification } from 'common'

export type WebSocketClient = ReturnType<typeof WebSocketClient>
export const WebSocketClient = ({
  authToken,
  restartTimeout = 1000,
  maxRestartTimeout = 30_000,
  notificationUrl = env.PUBLIC_NOTIFICATION_URL
}: {
  authToken: string
  restartTimeout?: number
  maxRestartTimeout?: number
  notificationUrl?: string
}) => {
  let currentRestartTimeout = restartTimeout
  let currentTimeout: ReturnType<typeof setTimeout> | undefined
  const onMessageCallbacks: ((data: Notification) => void)[] = []

  const createWebSocket = () => {
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

    const onClose = () => {
      appLogger.debug('🔴 WebSocket closed')
      webSocket.removeEventListener('message', onMessage)
      webSocket.removeEventListener('close', onClose)
      webSocket.removeEventListener('error', onError)
      webSocket.removeEventListener('open', onOpen)
      currentTimeout = setTimeout(() => {
        webSocket = createWebSocket()
      }, currentRestartTimeout)
    }

    ws.onmessage = onMessage
    ws.onopen = onOpen
    ws.onerror = onError
    ws.onclose = onClose

    return ws
  }

  let webSocket = createWebSocket()

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
      webSocket.close()
    }
  }
}
