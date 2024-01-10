export const config = {
  gateway: {
    baseUrl:
      process.env.GATEWAY_BASE_URL ??
      "https://babylon-stokenet-gateway.radixdlt.com",
  },
  redis: {
    host: process.env.REDIS_HOST ?? "localhost",
    port: parseInt(process.env.REDIS_PORT ?? "6379", 10),
    password: process.env.REDIS_PASSWORD ?? "password",
  },
};
