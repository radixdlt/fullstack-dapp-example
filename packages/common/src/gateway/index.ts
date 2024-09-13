import { ResultAsync, err, errAsync, fromPromise, ok, okAsync } from 'neverthrow'
import {
  GatewayApiClient,
  type ErrorResponse,
  RadixNetworkConfigById,
  type StateKeyValueStoreDataResponse,
  type FungibleResourcesCollectionItemVaultAggregated,
  type ProgrammaticScryptoSborValue
} from '@radixdlt/babylon-gateway-api-sdk'
import type { TransactionReceipt } from '@radixdlt/babylon-core-api-sdk'
import { cache } from './cache'
import { Addresses } from '../constants'

export type RawGatewayError = {
  errorResponse: ErrorResponse
}

type MethodsOf<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never
}

export type GatewayApi = ReturnType<typeof GatewayApi>

export const GatewayApi = (networkId: number, basePath?: string) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  const addresses = Addresses(networkId)

  if (!networkConfig) throw new Error(`Network with id ${networkId} is not supported.`)

  const gatewayApiClient = GatewayApiClient.initialize({
    applicationName: 'RadQuest',
    basePath: basePath || networkConfig.gatewayUrl
  })

  const isGatewayError = (error: any): error is RawGatewayError =>
    error.hasOwnProperty('errorResponse')

  const handleError = (error: unknown): ErrorResponse => {
    if (isGatewayError(error)) {
      return error.errorResponse
    } else {
      return {
        message: 'Unknown network error.'
      }
    }
  }

  function extractMethods<T>(instance: T): MethodsOf<T> {
    const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
    const methods: Partial<MethodsOf<T>> = {}

    for (const methodName of methodNames) {
      const method = (instance as any)[methodName]
      if (typeof method === 'function') {
        methods[methodName as keyof T] = method.bind(instance)
      }
    }

    return methods as MethodsOf<T>
  }

  const extractedMethods = {
    ...extractMethods(gatewayApiClient.state),
    ...extractMethods(gatewayApiClient.stream),
    ...extractMethods(gatewayApiClient.status),
    ...extractMethods(gatewayApiClient.transaction),
    ...extractMethods(gatewayApiClient.statistics),
    ...extractMethods(gatewayApiClient.stream.innerClient)
  }

  const callApiWithCache = <T extends keyof typeof extractedMethods>(
    ...[methodName, ...args]: Parameters<typeof callApi<T>>
  ): ReturnType<typeof callApi<T>> => {
    const _cache = cache[methodName]

    if (_cache && _cache.has(args)) return okAsync(_cache.get(args))

    return callApi(methodName, ...args)
  }

  const callApi = <T extends keyof typeof extractedMethods>(
    methodName: T,
    ...args: Parameters<(typeof extractedMethods)[T]>
  ) =>
    (
      fromPromise((extractedMethods[methodName] as any)(...args), handleError) as ResultAsync<
        Awaited<ReturnType<(typeof extractedMethods)[T]>>,
        ReturnType<typeof handleError>
      >
    ).map((res) => {
      const _cache = cache[methodName]
      if (_cache) _cache.set(args, res)
      return res
    })

  const hasKycEntry = (userId: string) => {
    return ResultAsync.fromPromise(
      gatewayApiClient.state.innerClient.keyValueStoreData({
        stateKeyValueStoreDataRequest: {
          key_value_store_address: addresses.components.kycOracleKeyValueStore,
          keys: [
            {
              key_json: {
                kind: 'String',
                value: userId
              }
            }
          ]
        }
      }),
      (jsError) => ({ reason: 'CouldNotGetKeyValueStoreDataFromGateway', jsError })
    ).map((response) => response.entries.length > 0)
  }

  const getInstapassBadges = (accountAddress: string) =>
    callApi('getEntityDetailsVaultAggregated', [accountAddress]).map(([response]) => {
      const item = response.non_fungible_resources.items.find(
        (item) => item.resource_address === addresses.badges.instapassBadgeAddress
      )

      const vault = item?.vaults?.items.find((vault) => (vault?.items?.length || 0) > 0)
      return vault?.items || []
    })

  const getKeyValueStoreDataForUser = (
    keyValueStoreAddress: string,
    userId: string
  ): ResultAsync<StateKeyValueStoreDataResponse, { reason: string; jsError?: any }> =>
    userId
      ? ResultAsync.fromPromise(
          gatewayApiClient.state.innerClient.keyValueStoreData({
            stateKeyValueStoreDataRequest: {
              key_value_store_address: keyValueStoreAddress,
              keys: [
                {
                  key_json: {
                    kind: 'String',
                    value: userId,
                    type_name: 'UserId'
                  }
                }
              ]
            }
          }),
          (jsError) => ({ reason: 'CouldNotGetKeyValueStoreDataForUser', jsError })
        )
      : errAsync({ reason: 'UserIdIsMissing' })

  const preview = (manifest: string) =>
    callApi('getCurrent').andThen((status) => {
      const currentEpoch = status.ledger_state.epoch
      return ResultAsync.fromPromise(
        gatewayApiClient.transaction.innerClient.transactionPreview({
          transactionPreviewRequest: {
            manifest,
            start_epoch_inclusive: currentEpoch,
            end_epoch_exclusive: currentEpoch + 1,
            tip_percentage: 0,
            nonce: Math.round(Math.random() * 10e8),
            signer_public_keys: [],
            flags: {
              use_free_credit: true,
              assume_all_signature_proofs: true,
              skip_epoch_check: true
            }
          }
        }),
        (jsError) => ({ reason: 'FailedToGetTransactionPreview', jsError })
      )
    })

  const getPreviewOutput = (manifest: string) =>
    preview(manifest)
      .map((response) => response.receipt as TransactionReceipt)
      .map((receipt) =>
        receipt.output
          ? (receipt.output[0].programmatic_json as ProgrammaticScryptoSborValue)
          : null
      )

  const getGiftBoxV2RewardsStatus = (userId: string) =>
    preview(
      `
        CALL_METHOD
          Address("${addresses.components.giftBoxOpenerV2}")
          "get_user_gift_box_counts"
          "${userId}";
      `
    ).map((response) => {
      const receipt = response.receipt as TransactionReceipt
      const output =
        receipt.status === 'Succeeded'
          ? receipt.output?.[0].programmatic_json.fields.map((field: any) => Number(field.value))
          : [0, 0, 0, 0]

      const [openedGiftBoxes, depositedRewards, claimedRewards, recalledRewards] =
        output as number[]

      return { openedGiftBoxes, claimedRewards, recalledRewards, depositedRewards }
    })

  const isDepositAllowedForResource = (
    accountAddress: string,
    resourceAddress: string
  ): ResultAsync<boolean, { reason: string }> =>
    ResultAsync.fromPromise(
      gatewayApiClient.transaction.innerClient.accountDepositPreValidation({
        accountDepositPreValidationRequest: {
          account_address: accountAddress,
          resource_addresses: [resourceAddress]
        }
      }),
      (error) => {
        const errorResponse = (error as RawGatewayError)?.errorResponse
        return { reason: errorResponse.message, code: errorResponse.code, error }
      }
    )
      .map(
        (response) =>
          response.resource_specific_behaviour?.find(
            (resource) => resource.resource_address === resourceAddress
          )?.allows_try_deposit || true
      )
      .orElse((error) => (error.code === 404 ? ok(true) : err(error)))

  const hasHeroBadge = (accountAddress: string) =>
    callApi('getEntityDetailsVaultAggregated', [accountAddress]).map(([response]) =>
      response.non_fungible_resources.items.some(
        (item) => item.resource_address === addresses.badges.heroBadgeAddress
      )
    )

  const getAccountGiftBoxes = (
    accountAddress: string
  ): ResultAsync<
    Record<string, { amount: number; name: string; imageUrl: string }>,
    { reason: string; jsError?: any }
  > =>
    accountAddress
      ? callApi('getEntityDetailsVaultAggregated', [accountAddress], {
          explicitMetadata: ['icon_url']
        })
          .map(([{ fungible_resources }]) => {
            const types = {
              [addresses.resources.giftBox.Starter]: 'Starter',
              [addresses.resources.giftBox.Simple]: 'Simple',
              [addresses.resources.giftBox.Fancy]: 'Fancy',
              [addresses.resources.giftBox.Elite]: 'Elite'
            }

            const [starter, simple, fancy, elite] = Object.values(types).map((type) =>
              fungible_resources.items.find(
                (item) => item.resource_address === addresses.resources.giftBox[type]
              )
            )

            const getAmount = (collection: FungibleResourcesCollectionItemVaultAggregated) =>
              collection.vaults.items
                .map((item) => item.amount)
                .reduce((acc, curr) => acc + parseInt(curr), 0)

            return [starter, simple, fancy, elite].filter(Boolean).reduce(
              (acc, curr, i) => {
                acc[curr?.resource_address!] = {
                  amount: curr ? getAmount(curr) : 0,
                  name: types[curr?.resource_address!],
                  imageUrl: (
                    curr?.explicit_metadata?.items.find((item) => item.key === 'icon_url')!.value
                      .typed as any
                  ).value as string
                }
                return acc
              },
              {} as Record<string, { amount: number; name: string; imageUrl: string }>
            )
          })
          .mapErr((jsError) => ({ reason: 'CouldNotGetAccountGiftBoxes', jsError }))
      : errAsync({ reason: 'AccountAddressIsMissing' })

  const hasAtLeastTwoRadgems = (accountAddress: string) =>
    callApi('getEntityDetailsVaultAggregated', [accountAddress]).map(([response]) => {
      const radgemVault = response.non_fungible_resources.items.find(
        (item) => item.resource_address === addresses.resources.radgemAddress
      )
      return radgemVault?.vaults.items.some((vault) => Number(vault.items?.length || 0) >= 2)
    })

  const hasHeroBadgeAndXrd = (accountAddress: string) =>
    callApi('getEntityDetailsVaultAggregated', [accountAddress]).map(([response]) => {
      const hasHeroBadge = response.non_fungible_resources.items
        .find((item) => item.resource_address === addresses.badges.heroBadgeAddress)
        ?.vaults.items.some((vault) => Number(vault.items?.length || 0) >= 1)

      const hasXrd = response.fungible_resources.items.some(
        (item) =>
          item.resource_address === addresses.xrd &&
          item.vaults.items.some((vault) => Number(vault.amount) > 0)
      )

      return { hasHeroBadge, hasXrd }
    })

  return {
    basePath: basePath || networkConfig.gatewayUrl,
    hasKycEntry,
    getInstapassBadges,
    hasAtLeastTwoRadgems,
    isDepositAllowedForResource,
    networkConfig,
    gatewayApiClient,
    preview,
    getPreviewOutput,
    getAccountGiftBoxes,
    getKeyValueStoreDataForUser,
    getGiftBoxV2RewardsStatus,
    extractedMethods,
    hasHeroBadge,
    hasHeroBadgeAndXrd,
    callApi,
    callApiWithCache
  }
}
