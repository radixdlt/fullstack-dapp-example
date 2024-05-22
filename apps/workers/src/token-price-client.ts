import { ResultAsync, ok, err, okAsync } from 'neverthrow'
import { config } from './config'
import { AppLogger, fetchWrapper } from 'common'
import BigNumber from 'bignumber.js'
import { RedisConnection } from 'queues'

export type TokenPrice = { resource_address: string; usd_price: number; last_updated_at: string }
export type TokensPriceResponse = { tokens: TokenPrice[] }

export type TokenPriceClient = ReturnType<typeof TokenPriceClient>
export const TokenPriceClient = ({
  logger,
  redisClient,
  xrdResourceAddress = 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
  redisKey = 'xrdPrice'
}: {
  logger: AppLogger
  redisClient: RedisConnection
  xrdResourceAddress?: string
  redisKey?: string
}) => {
  const getPriceFromRedis = () =>
    ResultAsync.fromPromise(
      redisClient.client.then((client) => client.get(redisKey)),
      (error) => {
        const jsError = error as Error
        logger.error({ module: 'TokenPriceClient', method: 'getPriceFromRedis.error', jsError })
        return jsError
      }
    ).map((price) => (price ? BigNumber(price) : undefined))

  const setPriceInRedis = (price: string) =>
    ResultAsync.fromPromise(
      redisClient.client.then((client) =>
        client.set(redisKey, price).then(() => client.expire(redisKey, 60))
      ),
      (error) => {
        const jsError = error as Error
        logger.error({ module: 'TokenPriceClient', method: 'setPriceInRedis.error', jsError })
        return jsError
      }
    )

  const fetchXrdPriceFromPricingService = () =>
    fetchWrapper<TokensPriceResponse>(
      fetch(`${config.priceService.baseUrl}/price/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currency: 'USD',
          tokens: [xrdResourceAddress]
        })
      })
    )
      .mapErr((error) => {
        logger.error({
          module: 'TokenPriceClient',
          method: 'fetchXrdPriceFromPricingService.error',
          error
        })
        return { reason: 'CouldNotFetchXrdPriceFromPricingService' }
      })
      .andThen((response) => {
        const isOkStatus = response.status === 200
        const tokens = response.data?.tokens
        if (isOkStatus && tokens) {
          const usdPrice = tokens.find(
            (token) => token.resource_address === xrdResourceAddress
          )?.usd_price
          return usdPrice ? ok(usdPrice) : err({ reason: 'PriceNotFound' })
        }
        return err({ reason: 'CouldNotGetXrdPrice' })
      })
      .andThen((price) =>
        setPriceInRedis(price.toString())
          .mapErr(() => ({ reason: 'FailedToSetPriceInRedis' }))
          .map(() => BigNumber(price))
      )

  const getXrdPrice = (): ResultAsync<BigNumber, { reason: string }> =>
    getPriceFromRedis()
      .mapErr(() => ({ reason: 'FailedToGetPriceFromRedis' }))
      .andThen((price) => (price ? okAsync(price) : fetchXrdPriceFromPricingService()))

  return { getXrdPrice }
}
