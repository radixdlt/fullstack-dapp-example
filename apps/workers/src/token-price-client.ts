import { ResultAsync, okAsync, errAsync } from 'neverthrow'
import { config } from './config'
import { AppLogger, fetchWrapper } from 'common'
import BigNumber from 'bignumber.js'
import { RedisConnection } from 'queues'

export type TokenPrice = { resource_address: string; usd_price: number; last_updated_at: string }
export type TokensPriceResponse = { tokens: TokenPrice[] }

export type TokenPriceClient = ReturnType<typeof TokenPriceClient>
export const TokenPriceClient = ({
  logger,
  redisClient
}: {
  logger: AppLogger
  redisClient: RedisConnection
}) => {
  const XRD_ADDRESS = 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd'

  const getPriceFromRedis = () =>
    ResultAsync.fromPromise(
      redisClient.client.then((client) => client.get('xrdPrice')),
      (error) => {
        logger.error({ error, method: 'TokenPriceClient.getPriceFromRedis', event: 'error' })
      }
    ).andThen((price) =>
      price
        ? okAsync(price)
        : errAsync({
            reason: 'Price is `null` in Redis'
          })
    )

  const setPriceInRedis = (price: string) =>
    ResultAsync.fromPromise(
      redisClient.client.then((client) => client.set('xrdPrice', price)),
      (error) => logger.error({ error, method: 'TokenPriceClient.setPriceInRedis', event: 'error' })
    ).orElse(() => okAsync('OK' as const))

  const fetchXrdPrice = () =>
    fetchWrapper<TokensPriceResponse>(
      fetch(`${config.priceService.baseUrl}/price/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currency: 'USD',
          tokens: [XRD_ADDRESS]
        })
      })
    )
      .map(({ data }) => data)
      .map(
        ({ tokens }) => tokens.find((token) => token.resource_address === XRD_ADDRESS)?.usd_price
      )
      .orElse(() => okAsync(undefined))

  const getXrdPrice = () =>
    fetchXrdPrice().andThen((price) =>
      price
        ? setPriceInRedis(price.toString()).map(() => BigNumber(price))
        : getPriceFromRedis().map((price) => BigNumber(price))
    )

  return { getXrdPrice }
}
