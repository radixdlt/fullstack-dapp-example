/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthController } from './controller'
import { AuthModel } from './model'
import { type MockContext, type Context, createMockContext } from '$lib/db/context'
import type { SignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import { AuthDbClient } from './db'
import { UserModel } from '../user/model'
import { UserDbClient } from '../user/db'
import { appLogger } from '$lib/helpers/logger'

let mockCtx: MockContext
let ctx: Context
let controller: AuthController

const methodCtx = { logger: appLogger }

describe('AuthController', () => {
  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    controller = AuthController({
      authModel: AuthModel(AuthDbClient(ctx.prisma)),
      userModel: UserModel(UserDbClient(ctx.prisma)),
      gatewayApiClient: ctx.gatewayApi,
      dAppConfig: {
        expectedOrigin: 'http://localhost:5173',
        dAppDefinitionAddress:
          'account_tdx_21_12x4zx09f8962a9wesfqvxaue0qn6m39r3cpysrjd6dtqppzhrkjrsr',
        networkId: 33
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
    const signedChallenge = {
      challenge: '761d830fc7e87771ae9cdff2808460b5307e46f3565705b40796f69049205b34',
      proof: {
        publicKey: 'fd727795ef11ae3d5115d4d43d663a11fdffba423fcdecc31bcabe294f36de26',
        signature:
          '3594b237d16ceba0856320168856608909df37012c3656150533ac6d2a702c08cc405fba6388a272d57d5f91661d3b7ce91d6bae0cdc30f67e084c25f8750d00',
        curve: 'curve25519'
      },
      address: 'identity_tdx_21_122e2z3e5ejjt5scy68jq0papztuddq49frm928vp5u24wn72qqzalc',
      type: 'persona'
    } satisfies SignedChallenge

    mockCtx.prisma.challenge.delete.mockResolvedValue(
      Promise.resolve({
        challenge: signedChallenge.challenge,
        createdAt: new Date()
      }) as any
    )

    mockCtx.gatewayApi.state.getEntityDetailsVaultAggregated.mockResolvedValue({
      metadata: {
        items: [
          {
            key: 'owner_keys',
            value: {
              raw_hex:
                '5c228f01202202010120071dc519481efeb8703f2e47d7449f5f28493a1d255da95ef9973e27286347010120071db2a14734cca4ba4304d1e40787a112f8d682a548f6551d81a715574fca'
            }
          }
        ]
      }
    } as any)

    mockCtx.prisma.user.upsert.mockResolvedValue(
      Promise.resolve({ identityAddress: signedChallenge.address }) as any
    )

    const result = await controller.login(methodCtx, signedChallenge, ctx.cookies)

    if (result.isErr()) {
      throw result.error
    }

    expect(result.value.data.authToken).toBeDefined()
  })
})
