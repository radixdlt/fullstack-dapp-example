import { appLogger } from 'common'
import { env } from '$env/dynamic/public'

export type WebSocketClient = ReturnType<typeof WebSocketClient>
export const WebSocketClient = ({
  authToken,
  restartTimeout = 1000,
  maxRestartTimeout = 30_000
}: {
  authToken: string
  restartTimeout?: number
  maxRestartTimeout?: number
}) => {
  let currentRestartTimeout = restartTimeout
  let currentTimeout: ReturnType<typeof setTimeout> | undefined
  let onMessageCallback: (data: Notification) => void

  const createWebSocket = () => {
    appLogger.info('🛫 Starting WebSocket')
    const ws = new WebSocket(env.PUBLIC_NOTIFICATION_URL, ['Authorization', authToken])

    const onMessage = (event: MessageEvent<Notification>) => {
      onMessageCallback?.(event.data)
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
    onMessage: (callback: (data: Notification) => void) => {
      onMessageCallback = callback
    },
    close: () => {
      clearTimeout(currentTimeout)
      webSocket.close()
    }
  }
}
