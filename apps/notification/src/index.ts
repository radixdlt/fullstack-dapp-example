import { hasStringUserId } from './helpers/validation'
import { config } from './config'
import { logger } from './helpers/logger'
import crypto from 'node:crypto'
import uWS from 'uWebSockets.js'
import http from 'http'
import { verifyToken } from './helpers/verifyAuthToken'
import { readRequestBody } from './helpers/readRequestBody'
import { respondFactory } from './helpers/respondFactory'
import client from 'prom-client'

const websocketPort = config.websocket.port
const internalApiPort = config.api.port

type WebSocket = uWS.WebSocket<{ userId: string; traceId: string }>

const activeSockets = new Map<string, WebSocket>()

const getLogger = (ctx: Partial<{ traceId: string; userId: string }>) => logger.child(ctx)

const wsClientsMetric = new client.Histogram({
  name: `connected_websocket_clients`,
  help: `The number of connected websocket clients`
})

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
            method: 'upgrade.verifyToken.success',
            userId
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
      wsClientsMetric.observe(activeSockets.size)
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
      wsClientsMetric.observe(activeSockets.size)
    }
  })
  .listen(websocketPort, (token) => {
    if (token) {
      logger.debug({ method: 'listen.success', port: websocketPort })
    } else {
      logger.debug({ method: 'listen.error', port: websocketPort })
    }
  })

http
  .createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    const respond = respondFactory(response)
    const apiLogger = logger.child({ method: `${request.method} ${request.url}` })
    switch (`${request.method} ${request.url}`) {
      case 'POST /api/send': {
        readRequestBody(request)
          .map((body) => {
            const userId = body?.userId

            if (!hasStringUserId(userId)) {
              respond.error(400, 'invalid request')
              return
            }

            const activeSocket = activeSockets.get(userId)

            if (!activeSocket) {
              respond.error(404, 'user have no active websocket')
              return
            }

            activeSocket.send(JSON.stringify(body.data))
            apiLogger.debug({
              userId,
              data: body.data,
              method: `${request.method} ${request.url}.success`
            })
            respond.success(200, {})
          })
          .mapErr((error) => {
            apiLogger.error({ error, method: `${request.method} ${request.url}.error` })
            respond.error(400, 'invalid request')
          })

        break
      }

      case 'GET /metrics': {
        response.writeHead(200)
        response.end(client.register.metrics())
        break
      }
    }
  })
  .listen(internalApiPort, () => {
    logger.debug({ method: 'internalApi.listen', port: internalApiPort })
  })
