import { Addresses } from 'common'

const networkId = parseInt(process.env.PUBLIC_NETWORK_ID ?? '2', 10)

export const config = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    password: process.env.REDIS_PASSWORD ?? 'password'
  },
  usdKYCThreshold: 5, // amount of dollars before system requires Instapass KYC
  postgres: {
    url: process.env.DATABASE_URL,
    readUrl: process.env.RO_DATABASE_URL
  },
  logLevel: process.env.LOG_LEVEL!,
  notification: {
    baseUrl: process.env.NOTIFICATION_INTERNAL_API_URL!
  },
  mailerLite: {
    apiKey: process.env.MAILER_LITE_API_KEY ?? ''
  },
  priceService: {
    baseUrl: process.env.PRICE_SERVICE_URL || 'https://token-price-service.radixdlt.com'
  },
  networkId,
  radQuest: {
    ...Addresses(networkId),
    directXrdDepositAmount: 5,
    elementsPerRadgem: 5
  },
  worker: {
    event: {
      concurrency: parseInt(process.env.EVENT_WORKER_CONCURRENCY ?? '5')
    },
    transaction: {
      concurrency: parseInt(process.env.TRANSACTION_WORKER_CONCURRENCY ?? '5')
    },
    system: {
      concurrency: parseInt(process.env.SYSTEM_WORKER_CONCURRENCY ?? '1')
    },
    depositGiftBoxRewardBuffer: {
      concurrency: parseInt(process.env.DEPOSIT_GIFT_BOX_REWARD_BUFFER_WORKER_CONCURRENCY ?? '1'),
      batchSize: parseInt(process.env.DEPOSIT_GIFT_BOX_REWARD_BUFFER_WORKER_BATCH_SIZE ?? '10'),
      batchInterval: parseInt(
        process.env.DEPOSIT_GIFT_BOX_REWARD_BUFFER_WORKER_BATCH_INTERVAL ?? '100'
      )
    },
    depositGiftBoxReward: {
      concurrency: parseInt(process.env.DEPOSIT_GIFT_BOX_REWARD_WORKER_CONCURRENCY ?? '2')
    }
  }
}
