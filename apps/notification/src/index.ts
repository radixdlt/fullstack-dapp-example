import { config } from "./config";
import { logger } from "./helpers/logger";

import uWS from "uWebSockets.js";
const websocketPort = config.websocket.port;
const internalApiPort = config.internalApi.port;

const webSocketApp = uWS
  .App()
  .ws("/*", {
    /* Options */
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    /* Handlers */
    open: (ws) => {
      logger.debug("A WebSocket connected!");
    },
    message: (ws, message, isBinary) => {
      /* Ok is false if backpressure was built up, wait for drain */
      let ok = ws.send(message, isBinary);
    },
    drain: (ws) => {
      logger.debug("WebSocket backpressure: " + ws.getBufferedAmount());
    },
    close: (ws, code, message) => {
      logger.debug("WebSocket closed");
    },
  })
  .any("/*", (res, req) => {
    res.end("Nothing to see here!");
  })
  .listen(websocketPort, (token) => {
    if (token) {
      logger.debug("websocket app listening to port " + websocketPort);
    } else {
      logger.debug("websocket app failed to listen to port " + websocketPort);
    }
  });

const internalApi = uWS
  .App()
  .any("/*", (res, req) => {
    res.end("Nothing to see here!");
  })
  .listen(internalApiPort, (token) => {
    if (token) {
      logger.debug("internal api listening to port " + internalApiPort);
    } else {
      logger.debug("internal api failed to listen to port " + internalApiPort);
    }
  });
