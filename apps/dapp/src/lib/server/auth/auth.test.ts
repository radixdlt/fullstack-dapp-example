import { Addresses, BlockedCountryModel, IpAssessmentModel } from 'common'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthController } from './controller'
import { AuthModel } from './model'
import { type MockContext, type Context, createMockContext } from '$lib/db/context'
import type { SignedChallenge } from '@radixdlt/radix-dapp-toolkit'
import { appLogger, UserModel } from 'common'
import { publicConfig } from '$lib/public-config'
import { UserQuestModel } from 'common'
import { config, type Config } from '$lib/config'
import { JWT } from './jwt'
import { FraudDetectionModule } from './fraud-detection/fraud-detection'
import { okAsync } from 'neverthrow'

let mockCtx: MockContext
let ctx: Context
let controller: AuthController

const methodCtx = { logger: appLogger, traceId: crypto.randomUUID() }
const dAppConfig = {
  dapp: {
    expectedOrigin: 'http://localhost:5173',
    dAppDefinitionAddress: publicConfig.dAppDefinitionAddress || '',
    networkId: 2,
    ...Addresses(2)
  }
} as unknown as Config

const jwt = JWT(config.jwt)

describe('AuthController', () => {
  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    const fraudDetectionModule = FraudDetectionModule({
      logger: methodCtx.logger,
      ipqs: {
        ...config.ipqs,
        allowAll: true
      },
      userModel: {
        getUserIdsByIp: () => okAsync([]),
        countReferralCodeUsagePerIp: () => okAsync(0),
        setUserBlockedStatus: () => okAsync({})
      } as any,
      ipAssessmentModel: IpAssessmentModel(ctx.prisma)(methodCtx.logger),
      blockedCountryModel: BlockedCountryModel(ctx.prisma)(methodCtx.logger)
    })
    controller = AuthController({
      logger: methodCtx.logger,
      authModel: AuthModel(ctx.prisma),
      loginAttemptModel: {
        add: () => okAsync({})
      },
      userModel: UserModel(ctx.prisma)(methodCtx.logger),
      fraudDetectionModule,
      userQuestModel: UserQuestModel(ctx.prisma)(methodCtx.logger),
      gatewayApi: ctx.gatewayApi,
      config: dAppConfig,
      jwt
    } as any)
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
      challenge: '2cb6baa15621065d1fae03fe212f2a186aab0fbc5adb82b0f1f714c771b2defe',
      proof: {
        publicKey: '4a19562b719389d11dc5b155f40efcafd1627f40cbd13a178a387881fa0f7589',
        signature:
          '7b849cbfcba80b8a97dd8be2cbc5b7e212832b67b9829774182e50a771ab26fdcd91d393aeaa8a5ad26de8a4fe53a8fa1c3fd855617c881a0646f66acd5c4102',
        curve: 'curve25519'
      },
      address: 'identity_tdx_2_12fg45ggztzm2pe0y3qktnfdtqq7wa0mfu69j4ayt4x8mlz8crkdgp0',
      type: 'persona'
    } satisfies SignedChallenge

    mockCtx.prisma.challenge.delete.mockResolvedValue(
      Promise.resolve({
        challenge: personaProof.challenge,
        createdAt: new Date()
      }) as any
    )

    mockCtx.gatewayApi.gatewayApiClient.state.getEntityDetailsVaultAggregated.mockResolvedValueOnce(
      {
        metadata: {
          items: [
            {
              key: 'owner_keys',
              value: {
                raw_hex:
                  '5c228f01202201010120071d515a210258b6a0e5e4882cb9a5ab003ceebf69e68b2af48ba98fbf88f8'
              }
            }
          ]
        }
      } as any
    )

    mockCtx.prisma.user.findUnique.mockResolvedValue(
      Promise.resolve({ identityAddress: personaProof.address, id: 'a', type: 'b' }) as any
    )

    mockCtx.prisma.user.count.mockResolvedValue(Promise.resolve(true) as any)

    mockCtx.prisma.loginAttempt.create.mockResolvedValue(Promise.resolve({}) as any)
    mockCtx.prisma.blockedCountry.findFirst.mockResolvedValue(Promise.resolve(null) as any)

    mockCtx.prisma.completedQuestRequirement.upsert.mockResolvedValue(Promise.resolve({}) as any)

    const result = await controller.login(methodCtx, {
      personaProof,
      ip: '',
      userAgent: '',
      acceptLanguage: '',
      cookies: ctx.cookies
    })

    if (result.isErr()) {
      throw result.error
    }

    expect(result.value.data.authToken).toBeDefined()
  })
})
