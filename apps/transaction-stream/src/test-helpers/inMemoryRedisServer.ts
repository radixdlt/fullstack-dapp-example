import { RedisMemoryServer } from 'redis-memory-server'

export const RedisServer = async () => {
  const redisServer = new RedisMemoryServer()

  const host = await redisServer.getHost()
  const port = await redisServer.getPort()

  // even if you forget to stop `redis-server`,
  // when your script exits, a special process killer will shut it down for you
  return { host, port, redisServer, url: `redis://${host}:${port}` }
}
