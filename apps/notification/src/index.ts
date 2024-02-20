import { config } from './config'
import { logger } from './helpers/logger'
import crypto from 'node:crypto'
import uWS from 'uWebSockets.js'
import { verifyToken } from './helpers/verifyAuthToken'
const websocketPort = config.websocket.port

type WebSocket = uWS.WebSocket<{ userId: string; traceId: string }>

const activeSockets = new Map<string, WebSocket>()

const getLogger = (ctx: Partial<{ traceId: string; userId: string }>) => logger.child(ctx)

uWS
  .App()
  .ws('/*', {
    /* Options */
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    /* Handlers */
    upgrade: (res, req, context) => {
      const traceId = crypto.randomUUID()
      const childLogger = getLogger({ traceId })

      const rawHeader = req.getHeader('sec-websocket-protocol')

      const [, jwt] = rawHeader.split(', ')

      childLogger.debug({ method: 'upgrade', jwt })

      verifyToken(jwt)
        .map((userId) => {
          childLogger.debug({
            method: 'upgrade.verifyToken',
            userId,
            event: 'success'
          })
          res.upgrade(
            {
              userId,
              traceId
            },
            req.getHeader('sec-websocket-key'),
            req.getHeader('sec-websocket-protocol'),
            req.getHeader('sec-websocket-extensions'),
            context
          )
        })
        .mapErr((error) => {
          childLogger.debug({
            error,
            method: 'upgrade.verifyToken',
            event: 'error'
          })
          res.writeStatus('401').end()
        })
    },
    open: (ws: WebSocket) => {
      const { userId, traceId } = ws.getUserData()
      const childLogger = getLogger({ traceId, userId })
      childLogger.debug({ method: 'open' })
      activeSockets.set(userId, ws)
    },
    message: (ws: WebSocket, message) => {
      const { userId, traceId } = ws.getUserData()
      const websocket = activeSockets.get(userId)
      const childLogger = getLogger({ traceId, userId })

      childLogger.debug({ method: 'message', message })
      websocket?.send('Hello from the server')
    },
    drain: (ws) => {
      const { userId, traceId } = ws.getUserData()
      const childLogger = getLogger({ traceId, userId })
      childLogger.debug({ method: 'drain', backpressure: ws.getBufferedAmount() })
    },
    close: (ws) => {
      const { userId, traceId } = ws.getUserData()
      const childLogger = getLogger({ traceId, userId })
      childLogger.debug({ method: 'close' })
      activeSockets.delete(userId)
    }
  })
  .listen(websocketPort, (token) => {
    if (token) {
      logger.debug({ method: 'listen', event: 'success', port: websocketPort })
    } else {
      logger.debug({ method: 'listen', event: 'error', port: websocketPort })
    }
  })
