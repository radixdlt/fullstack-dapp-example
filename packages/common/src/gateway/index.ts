import { fromPromise, okAsync, type ResultAsync } from 'neverthrow'
import {
  GatewayApiClient,
  type ErrorResponse,
  RadixNetworkConfigById
} from '@radixdlt/babylon-gateway-api-sdk'
import { cache } from './cache'

export const networkConfig =
  RadixNetworkConfigById[process.env.PUBLIC_NETWORK_ID! as unknown as number]

export const gatewayApiClient = GatewayApiClient.initialize({
  applicationName: 'RadQuest',
  basePath: networkConfig.gatewayUrl
})

type RawGatewayError = {
  errorResponse: ErrorResponse
}

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

type MethodsOf<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never
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

export type GatewayApi = typeof gatewayApiClient
export const gatewayApi = {
  ...extractMethods(gatewayApiClient.state),
  ...extractMethods(gatewayApiClient.stream),
  ...extractMethods(gatewayApiClient.status),
  ...extractMethods(gatewayApiClient.transaction),
  ...extractMethods(gatewayApiClient.statistics)
}

export const callApiWithCache = <T extends keyof typeof gatewayApi>(
  ...[methodName, ...args]: Parameters<typeof callApi<T>>
): ReturnType<typeof callApi<T>> => {
  const _cache = cache[methodName]

  if (_cache && _cache.has(args)) return okAsync(_cache.get(args))

  return callApi(methodName, ...args)
}

export const callApi = <T extends keyof typeof gatewayApi>(
  methodName: T,
  ...args: Parameters<(typeof gatewayApi)[T]>
) =>
  (
    fromPromise((gatewayApi[methodName] as any)(...args), handleError) as ResultAsync<
      Awaited<ReturnType<(typeof gatewayApi)[T]>>,
      ReturnType<typeof handleError>
    >
  ).map((res) => {
    const _cache = cache[methodName]
    if (_cache) _cache.set(args, res)
    return res
  })
