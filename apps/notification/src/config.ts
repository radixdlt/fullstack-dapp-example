export const config = {
  gateway: {
    baseUrl:
      process.env.GATEWAY_BASE_URL ??
      "https://babylon-stokenet-gateway.radixdlt.com",
  },
  websocket: {
    port: process.env.WEBSOCKET_PORT
      ? parseInt(process.env.WEBSOCKET_PORT)
      : 9000,
  },
  internalApi: {
    port: process.env.INTERNAL_API_PORT
      ? parseInt(process.env.INTERNAL_API_PORT)
      : 4000,
  },
  logLevel: process.env.LOG_LEVEL!,
};
