export const config = {
  websocket: {
    port: parseInt(process.env.NOTIFICATION_WEBSOCKET_PORT!)
  },
  api: {
    port: parseInt(process.env.NOTIFICATION_INTERNAL_API_PORT!)
  },
  logLevel: process.env.LOG_LEVEL!,
  jwt: {
    secret: process.env.JWT_SECRET!
  }
}
