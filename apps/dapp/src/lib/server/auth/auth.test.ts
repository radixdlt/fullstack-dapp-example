import { Addresses } from 'common'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthController } from './controller'
import { AuthModel } from './model'
import { type MockContext, type Context, createMockContext } from '$lib/db/context'
import type { SignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import { appLogger, UserModel } from 'common'
import { publicConfig } from '$lib/public-config'
import { UserQuestModel } from 'common'

let mockCtx: MockContext
let ctx: Context
let controller: AuthController

const methodCtx = { logger: appLogger, traceId: crypto.randomUUID() }

describe('AuthController', () => {
  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    controller = AuthController({
      authModel: AuthModel(ctx.prisma),
      userModel: UserModel(ctx.prisma),
      userQuestModel: UserQuestModel(ctx.prisma),
      gatewayApiClient: ctx.gatewayApi,
      dAppConfig: {
        expectedOrigin: 'http://localhost:5173',
        domain: '',
        dAppDefinitionAddress: publicConfig.dAppDefinitionAddress || '',
        networkId: 2,
        ...Addresses(2)
      }
    })
  })

  it('should create a challenge', async () => {
    mockCtx.prisma.challenge.create.mockResolvedValue(
      Promise.resolve({ challenge: 'deadbeef' }) as any
    )

    const result = await controller.createChallenge(methodCtx)

    if (result.isErr()) throw result.error

    const { data, httpResponseCode } = result.value

    expect(data.challenge).eq('deadbeef')
    expect(httpResponseCode).toBe(201)
  })

  it('should successfully verify a valid challenge', async () => {
    const personaProof = {
      challenge: '3e6a245dae8caac3e4e08439da4783521417cc4c5789dadaab62638fd91ecbb5',
      proof: {
        publicKey: 'cf347ce43b40f4f79d2af4dbcf8f89fccd5b305e04dd8fb3a038201b97116b18',
        signature:
          '3030e3099f3f9415c548b899d25e416ae7bcab6a65609eb37179847a7ded118c616983f6e9e5dc67557ca452a56c0bf82adeb5bf2b6738d6a63ea5bf7d603100',
        curve: 'curve25519'
      },
      address: 'identity_tdx_2_122vvjvggrz8es2gxl8lw02yvmmrw87fuxdy6elwffnl6guwhtqw75q',
      type: 'persona'
    } satisfies SignedChallenge

    mockCtx.prisma.challenge.delete.mockResolvedValue(
      Promise.resolve({
        challenge: personaProof.challenge,
        createdAt: new Date()
      }) as any
    )

    mockCtx.gatewayApi.state.getEntityDetailsVaultAggregated.mockResolvedValueOnce({
      metadata: {
        items: [
          {
            key: 'owner_keys',
            value: {
              raw_hex:
                '5c228f01202201010120071d98c93108188f982906f9fee7a88cdec6e3f93c3349acfdc94cffa471d7'
            }
          }
        ]
      }
    } as any)

    mockCtx.gatewayApi.state.getEntityDetailsVaultAggregated.mockResolvedValueOnce({
      metadata: {
        items: [
          {
            key: 'owner_keys',
            value: {
              raw_hex:
                '5c228f01202201010120071d4039545198a67d5458f898afbe0c7ea91ceb5e9cf77b368a73b542be7d'
            }
          }
        ]
      }
    } as any)

    mockCtx.prisma.user.upsert.mockResolvedValue(
      Promise.resolve({ identityAddress: personaProof.address }) as any
    )

    mockCtx.prisma.completedQuestRequirement.upsert.mockResolvedValue(Promise.resolve({}) as any)

    const result = await controller.login(
      methodCtx,
      {
        personaProof
      },
      ctx.cookies
    )

    if (result.isErr()) {
      throw result.error
    }

    expect(result.value.data.authToken).toBeDefined()
  })
})
