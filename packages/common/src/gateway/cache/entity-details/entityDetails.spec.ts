import type { StateEntityDetailsVaultResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import { entityDetailsCache } from './entityDetails'
import type { GatewayApi } from '../..'
import { describe, beforeEach, it, expect } from 'vitest'

const mockResponse = (...responses: { address: string; data?: any }[]) =>
  responses as StateEntityDetailsVaultResponseItem[]

type Params = Parameters<GatewayApi['extractedMethods']['getEntityDetailsVaultAggregated']>

describe('entity details cache', () => {
  beforeEach(() => {
    entityDetailsCache.clear()
  })

  it('should update the cache', () => {
    const addresses = ['address1', 'address2', 'address3']
    const params = [addresses] as Params
    const response = mockResponse(...addresses.map((address) => ({ address })))

    entityDetailsCache.set(params, response)

    expect(entityDetailsCache.get(params)).toEqual(response)
  })

  it('should check if data is in the cache', () => {
    const addresses = ['address1', 'address2', 'address3']
    const params = [addresses] as Params
    const response = mockResponse(...addresses.map((address) => ({ address })))

    entityDetailsCache.set(params, response)

    const hasData = entityDetailsCache.has(params)

    expect(hasData).toBe(true)

    const hasData2 = entityDetailsCache.has([['address1']])

    expect(hasData2).toBe(true)
  })

  it('should add new data entry if options are different', () => {
    const addresses = ['address1', 'address2', 'address3']
    const params = [addresses] as Params
    const response = mockResponse(...addresses.map((address) => ({ address })))

    entityDetailsCache.set(params, response)

    const newOptions = { ancestorIdentities: true }
    const newParams = [[addresses[0]], newOptions] as Params
    const newResponse = mockResponse({ address: addresses[0], data: 'updated' })

    entityDetailsCache.set(newParams, newResponse)

    expect(entityDetailsCache.get(params)).toEqual(response)
    expect(entityDetailsCache.get(newParams)).toEqual(newResponse)
  })

  it('should check if data is not in the cache', () => {
    const addresses = ['address1', 'address2', 'address3']
    const params = [addresses] as Params

    const hasData = entityDetailsCache.has(params)

    expect(hasData).toBe(false)
  })

  it('should return data from the cache', () => {
    const addresses = ['address1', 'address2', 'address3']
    const params = [addresses] as Params
    const response = mockResponse(...addresses.map((address) => ({ address })))

    entityDetailsCache.set(params, response)

    const data = entityDetailsCache.get(params)

    expect(data).toEqual(response)

    const data2 = entityDetailsCache.get([[params[0][0]]])

    expect(data2).toEqual([response[0]])
  })
})
