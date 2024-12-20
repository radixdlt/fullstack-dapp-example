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
  priceService: {
    baseUrl: process.env.PRICE_SERVICE_URL || 'https://token-price-service.radixdlt.com'
  },
  networkId,
  radQuest: {
    ...Addresses(networkId),
    directXrdDepositAmount: 50,
    elementsPerRadgem: 5
  },
  worker: {
    event: {
      concurrency: parseInt(process.env.EVENT_WORKER_CONCURRENCY ?? '5')
    },
    system: {
      concurrency: parseInt(process.env.SYSTEM_WORKER_CONCURRENCY ?? '1')
    },
    depositGiftBoxReward: {
      concurrency: parseInt(process.env.DEPOSIT_GIFT_BOX_REWARD_WORKER_CONCURRENCY ?? '2'),
      buffer: {
        concurrency: parseInt(process.env.DEPOSIT_GIFT_BOX_REWARD_BUFFER_WORKER_CONCURRENCY ?? '1'),
        batchSize: parseInt(process.env.DEPOSIT_GIFT_BOX_REWARD_BUFFER_WORKER_BATCH_SIZE ?? '10'),
        batchInterval: parseInt(
          process.env.DEPOSIT_GIFT_BOX_REWARD_BUFFER_WORKER_BATCH_INTERVAL ?? '1000'
        )
      }
    },
    depositQuestReward: {
      concurrency: parseInt(process.env.DEPOSIT_QUEST_REWARD_WORKER_CONCURRENCY ?? '2'),
      buffer: {
        concurrency: parseInt(process.env.DEPOSIT_QUEST_REWARD_BUFFER_WORKER_CONCURRENCY ?? '1'),
        batchSize: parseInt(process.env.DEPOSIT_QUEST_REWARD_BUFFER_WORKER_BATCH_SIZE ?? '10'),
        batchInterval: parseInt(
          process.env.DEPOSIT_QUEST_REWARD_BUFFER_WORKER_BATCH_INTERVAL ?? '1000'
        )
      }
    },
    depositHeroBadge: {
      concurrency: parseInt(process.env.DEPOSIT_HERO_BADGE_WORKER_CONCURRENCY ?? '2'),
      buffer: {
        concurrency: parseInt(process.env.DEPOSIT_HERO_BADGE_BUFFER_WORKER_CONCURRENCY ?? '1'),
        batchSize: parseInt(process.env.DEPOSIT_HERO_BADGE_BUFFER_WORKER_BATCH_SIZE ?? '40'),
        batchInterval: parseInt(
          process.env.DEPOSIT_HERO_BADGE_BUFFER_WORKER_BATCH_INTERVAL ?? '1000'
        )
      }
    },
    createRadGems: {
      concurrency: parseInt(process.env.CREATE_RADGEMS_WORKER_CONCURRENCY ?? '2'),
      buffer: {
        concurrency: parseInt(process.env.CREATE_RADGEMS_BUFFER_WORKER_CONCURRENCY ?? '1'),
        batchSize: parseInt(process.env.CREATE_RADGEMS_BUFFER_WORKER_BATCH_SIZE ?? '10'),
        batchInterval: parseInt(process.env.CREATE_RADGEMS_BUFFER_WORKER_BATCH_INTERVAL ?? '1000')
      }
    },
    depositXrd: {
      concurrency: parseInt(process.env.DEPOSIT_XRD_WORKER_CONCURRENCY ?? '2'),
      buffer: {
        concurrency: parseInt(process.env.DEPOSIT_XRD_BUFFER_WORKER_CONCURRENCY ?? '1'),
        batchSize: parseInt(process.env.DEPOSIT_XRD_BUFFER_WORKER_BATCH_SIZE ?? '50'),
        batchInterval: parseInt(process.env.DEPOSIT_XRD_BUFFER_WORKER_BATCH_INTERVAL ?? '1000')
      }
    },
    questCompleted: {
      concurrency: parseInt(process.env.QUEST_COMPLETED_WORKER_CONCURRENCY ?? '2'),
      buffer: {
        concurrency: parseInt(process.env.QUEST_COMPLETED_BUFFER_WORKER_CONCURRENCY ?? '1'),
        batchSize: parseInt(process.env.QUEST_COMPLETED_BUFFER_WORKER_BATCH_SIZE ?? '50'),
        batchInterval: parseInt(process.env.QUEST_COMPLETED_BUFFER_WORKER_BATCH_INTERVAL ?? '1000')
      }
    },
    depositPartialReward: {
      concurrency: parseInt(process.env.DEPOSIT_PARTIAL_REWARD_WORKER_CONCURRENCY ?? '2'),
      buffer: {
        concurrency: parseInt(process.env.DEPOSIT_PARTIAL_REWARD_BUFFER_WORKER_CONCURRENCY ?? '1'),
        batchSize: parseInt(process.env.DEPOSIT_PARTIAL_REWARD_BUFFER_WORKER_BATCH_SIZE ?? '20'),
        batchInterval: parseInt(
          process.env.DEPOSIT_PARTIAL_REWARD_BUFFER_WORKER_BATCH_INTERVAL ?? '1000'
        )
      }
    }
  }
}
