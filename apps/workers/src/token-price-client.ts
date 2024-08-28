import { ok, err, ResultAsync } from 'neverthrow'
import { config } from './config'
import { fetchWrapper, WorkerError } from 'common'
import BigNumber from 'bignumber.js'
import { WorkerOutputError } from './_types'

export type TokenPrice = { resource_address: string; usd_price: number; last_updated_at: string }
export type TokensPriceResponse = { tokens: TokenPrice[] }

export type TokenPriceClient = ReturnType<typeof TokenPriceClient>
export const TokenPriceClient = () => {
  const getPrice = (
    tokenAddress: string,
    currency: 'USD' = 'USD'
  ): ResultAsync<BigNumber, WorkerOutputError> =>
    fetchWrapper<TokensPriceResponse>(
      fetch(`${config.priceService.baseUrl}/price/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currency,
          tokens: [tokenAddress]
        })
      })
    )
      .mapErr((error) => ({ reason: WorkerError.FailedToGetTokenPrice, jsError: error }))
      .andThen((response) => {
        const isOkStatus = response.status === 200
        const tokens = response.data?.tokens
        if (isOkStatus && tokens) {
          const usdPrice = tokens.find(
            (token) => token.resource_address === tokenAddress
          )?.usd_price
          return usdPrice ? ok(usdPrice) : err({ reason: WorkerError.TokenPriceNotFound })
        }
        return err({ reason: WorkerError.FailedToGetTokenPrice, jsError: response })
      })
      .map((price) => BigNumber(price))

  return { getPrice }
}
