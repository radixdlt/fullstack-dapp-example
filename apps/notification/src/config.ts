export const config = {
  websocket: {
    port: parseInt(process.env.NOTIFICATION_WEBSOCKET_PORT!)
  },
  logLevel: process.env.LOG_LEVEL!,
  jwt: {
    secret: process.env.JWT_SECRET!
  }
}
