import type { StateEntityMetadataPageResponse } from '@radixdlt/babylon-gateway-api-sdk'
import { describe, beforeEach, it, expect } from 'vitest'
import { entityMetadataCache, GetEntityMetadata } from './entityMetadata'

type Params = Parameters<GetEntityMetadata>

const mockResponse = (response: Partial<StateEntityMetadataPageResponse>) =>
  response as StateEntityMetadataPageResponse

describe('entity metadata cache', () => {
  beforeEach(() => {
    entityMetadataCache.clear()
  })

  it('should update the cache', () => {
    const params = ['address1', undefined] as Params
    const response = mockResponse({ address: params[0] })

    entityMetadataCache.set(params, response)

    expect(entityMetadataCache.get(params)).toEqual(response)
  })

  it('should check if data is in the cache', () => {
    const address = 'address2'
    const response = mockResponse({ address })
    const params = [address] as Params
    entityMetadataCache.set(params, response)

    const hasData = entityMetadataCache.has(params)

    expect(hasData).toBe(true)

    const hasData2 = entityMetadataCache.has(params)

    expect(hasData2).toBe(true)
  })

  it('should add new data entry if options are different', () => {
    const address = 'address2'
    const params = [address] as Params
    const response = mockResponse({ address, items: [] })

    entityMetadataCache.set(params, response)

    const newParams = [params[0], '123'] as Params
    const newResponse = mockResponse({ address, next_cursor: '321' })

    entityMetadataCache.set(newParams, newResponse)

    expect(entityMetadataCache.get(params)).toEqual(response)
    expect(entityMetadataCache.get(newParams)).toEqual(newResponse)
  })

  it('should check if data is not in the cache', () => {
    const params = ['address1'] as Params

    const hasData = entityMetadataCache.has(params)

    expect(hasData).toBe(false)
  })

  it('should return data from the cache', () => {
    const address = 'address1'
    const params = [address] as Params
    const response = mockResponse({ address })

    entityMetadataCache.set(params, response)

    const data = entityMetadataCache.get(params)

    expect(data).toEqual(response)
  })
})
