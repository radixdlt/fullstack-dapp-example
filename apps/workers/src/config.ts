import { Addresses } from 'common'
import { getDerivationPath, mnemonicToKeyPair } from 'typescript-wallet'

const networkId = parseInt(process.env.PUBLIC_NETWORK_ID ?? '2', 10)

export const config = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    password: process.env.REDIS_PASSWORD ?? 'password'
  },
  usdKYCThreshold: 5, // amount of dollars before system requires Instapass KYC
  referralRewardXrdAmount: 50, // amount of XRD to reward referrer when referee completes basic quests
  postgres: {
    database: process.env.POSTGRES_DATABASE ?? 'radquest',
    host: process.env.POSTGRES_HOST ?? 'localhost',
    user: process.env.POSTGRES_USER ?? 'user',
    password: process.env.POSTGRES_PASSWORD ?? 'password',
    port: parseInt(process.env.POSTGRES_PORT ?? '5433', 10)
  },
  logLevel: process.env.LOG_LEVEL!,
  notification: {
    baseUrl: process.env.NOTIFICATION_INTERNAL_API_URL!
  },
  mailerLite: {
    apiKey: process.env.MAILER_LITE_API_KEY ?? '',
    groupId: process.env.PUBLIC_MAILER_LITE_RADQUEST_GROUP_ID
  },
  priceService: {
    baseUrl: process.env.PRICE_SERVICE_URL || 'https://token-price-service.radixdlt.com'
  },
  networkId,
  radQuest: {
    ...Addresses(networkId),
    directXrdDepositAmount: 10
  },
  keyPairs: {
    payer: mnemonicToKeyPair(
      process.env.PAYER_MNEMONIC!,
      getDerivationPath(networkId, 'TRANSACTION_SIGNING', 'ACCOUNT', 0)
    ),
    owner: mnemonicToKeyPair(
      process.env.OWNER_MNEMONIC!,
      getDerivationPath(networkId, 'TRANSACTION_SIGNING', 'ACCOUNT', 0)
    ),
    system: mnemonicToKeyPair(
      process.env.SYSTEM_MNEMONIC!,
      getDerivationPath(networkId, 'TRANSACTION_SIGNING', 'ACCOUNT', 0)
    ),
    dAppDefinition: mnemonicToKeyPair(
      process.env.DAPP_DEFINITION_MNEMONIC!,
      getDerivationPath(networkId, 'TRANSACTION_SIGNING', 'ACCOUNT', 0)
    )
  }
}
