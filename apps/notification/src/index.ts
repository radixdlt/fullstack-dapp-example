import { config } from './config'
import { logger } from './helpers/logger'
import cookie from 'cookie'

import uWS from 'uWebSockets.js'
import { verifyToken } from './helpers/verifyAuthToken'
const websocketPort = config.websocket.port

const activeSockets = new Map<string, uWS.WebSocket<{ identityAddress: string }>>()

uWS
  .App()
  .ws('/*', {
    /* Options */
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    /* Handlers */
    upgrade: (res, req, context) => {
      const cookies = cookie.parse(req.getHeader('cookie'))

      verifyToken(cookies.jwt)
        .map((identityAddress) => {
          res.upgrade(
            {
              identityAddress
            },
            req.getHeader('sec-websocket-key'),
            req.getHeader('sec-websocket-protocol'),
            req.getHeader('sec-websocket-extensions'),
            context
          )
        })
        .mapErr((error) => {
          logger.debug({ error, reason: 'failedToVerifyAuthToken', method: 'upgrade' })
          res.writeStatus('401').end()
        })
    },
    open: (ws: uWS.WebSocket<{ identityAddress: string }>) => {
      logger.debug(ws.getUserData())
      activeSockets.set(ws.getUserData().identityAddress, ws)
    },
    message: () => {
      /* Ok is false if backpressure was built up, wait for drain */
    },
    drain: (ws) => {
      logger.debug('WebSocket backpressure: ' + ws.getBufferedAmount())
    },
    close: (ws) => {
      logger.debug('WebSocket closed')
      activeSockets.delete(ws.getUserData().identityAddress)
    }
  })
  .listen(websocketPort, (token) => {
    if (token) {
      logger.debug('websocket app listening to port ' + websocketPort)
    } else {
      logger.debug('websocket app failed to listen to port ' + websocketPort)
    }
  })
