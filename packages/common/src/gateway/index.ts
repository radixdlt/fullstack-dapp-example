import { ResultAsync, err, fromPromise, ok, okAsync } from 'neverthrow'
import {
  GatewayApiClient,
  type ErrorResponse,
  RadixNetworkConfigById
} from '@radixdlt/babylon-gateway-api-sdk'
import { cache } from './cache'
import { Addresses } from '../constants'

export type RawGatewayError = {
  errorResponse: ErrorResponse
}

type MethodsOf<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never
}

export type GatewayApi = ReturnType<typeof GatewayApi>

export const GatewayApi = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  const addresses = Addresses(networkId)

  if (!networkConfig) throw new Error(`Network with id ${networkId} is not supported.`)

  const gatewayApiClient = GatewayApiClient.initialize({
    applicationName: 'RadQuest',
    basePath: networkConfig.gatewayUrl
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

  const hasKycEntry = (address: string) => {
    return ResultAsync.fromPromise(
      gatewayApiClient.state.innerClient.keyValueStoreData({
        stateKeyValueStoreDataRequest: {
          key_value_store_address: addresses.components.kycOracleKeyValueStore,
          keys: [
            {
              key_json: {
                kind: 'String',
                value: address
              }
            }
          ]
        }
      }),
      (jsError) => ({ reason: 'CouldNotGetKeyValueStoreDataFromGateway', jsError })
    ).map((response) => response.entries.length > 0)
  }

  const getDefaultDepositRule = (accountAddress: string) =>
    callApi('getEntityDetailsVaultAggregated', [accountAddress])
      .mapErr((error) => ({ reason: 'GatewayError', error }))
      .andThen(([response]) =>
        response.details?.type === 'Component' &&
        response.details.state &&
        'default_deposit_rule' in response.details.state
          ? ok(response.details.state.default_deposit_rule)
          : err({ reason: 'MissingDepositRuleValue' })
      )

  const getResourceDepositRuleDisable = (accountAddress: string, resourceAddress: string) =>
    ResultAsync.fromPromise(
      gatewayApiClient.state.innerClient.accountResourcePreferencesPage({
        stateAccountResourcePreferencesPageRequest: { account_address: accountAddress }
      }),
      (error) => {
        const errorResponse = (error as RawGatewayError)?.errorResponse
        return { reason: errorResponse.message, code: errorResponse.code, error }
      }
    )
      .map((response) => response.items.find((item) => item.resource_address === resourceAddress))
      .map((item) => item?.resource_preference_rule)
      // If the account can't be found (404), it is virtual and defaults to default deposit rule
      .orElse((error) => (error.code === 404 ? ok('Allowed') : err(error)))

  const isDepositDisabledForResource = (
    accountAddress: string,
    resourceAddress: string
  ): ResultAsync<boolean, { reason: string }> =>
    ResultAsync.combine([
      getResourceDepositRuleDisable(accountAddress, resourceAddress),
      getDefaultDepositRule(accountAddress)
    ]).map(([resourceDepositRule, defaultRule]) => {
      if (resourceDepositRule) {
        return resourceDepositRule === 'Disallowed'
      } else {
        return defaultRule === 'Reject'
      }
    })

  const hasHeroBadge = (accountAddress: string) =>
    callApi('getEntityDetailsVaultAggregated', [accountAddress]).map(([response]) =>
      response.non_fungible_resources.items.some(
        (item) => item.resource_address === addresses.badges.heroBadgeAddress
      )
    )

  const hasHeroBadgeAndXrd = (accountAddress: string) =>
    callApi('getEntityDetailsVaultAggregated', [accountAddress]).map(([response]) => {
      const hasHeroBadge = response.non_fungible_resources.items.some(
        (item) => item.resource_address === addresses.badges.heroBadgeAddress
      )

      const hasXrd = response.fungible_resources.items.some(
        (item) =>
          item.resource_address === addresses.xrd &&
          item.vaults.items.some((vault) => Number(vault.amount) > 0)
      )

      return { hasHeroBadge, hasXrd }
    })

  return {
    hasKycEntry,
    isDepositDisabledForResource,
    networkConfig,
    gatewayApiClient,
    extractedMethods,
    hasHeroBadge,
    hasHeroBadgeAndXrd,
    callApi,
    callApiWithCache
  }
}
