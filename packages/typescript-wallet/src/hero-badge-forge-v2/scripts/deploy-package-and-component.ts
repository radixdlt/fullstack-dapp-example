import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'
import { logger } from '../../helpers'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { newHeroBadgeForgeV2 } from '../helpers/newHeroBadgeForgeV2.ts'

const rpdPath =
  '../../scrypto-packages/hero-badge-forge-v2/target/wasm32-unknown-unknown/release/hero_badge_forge_v2.rpd'
const wasmPath =
  '../../scrypto-packages/hero-badge-forge-v2/target/wasm32-unknown-unknown/release/hero_badge_forge_v2.wasm'

if (!existsSync(resolve(rpdPath)) || !existsSync(resolve(wasmPath))) {
  throw new Error('rpd and wasm files not found')
}

const rpd = readFileSync(rpdPath)
const wasm = readFileSync(wasmPath)

const addresses: Record<string, string> = {}

publishPackageAdvanced({
  rpd,
  wasm,
  adminBadge: config.radQuest.badges.superAdminBadgeAddress
})
  .map((packageAddress) => (addresses.heroBadgeForgeV2Package = packageAddress))
  .map(() => logger.debug('Package deployed'))
  .andThen(() =>
    mintAdminBadge({
      adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
      superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
      amount: 1
    })
  )
  .map(() => logger.debug('Admin badge minted'))
  .andThen(() => newHeroBadgeForgeV2(addresses.heroBadgeForgeV2Package))
  .map((res) => Object.assign(addresses, res))
  .map(() => logger.debug('heroBadgeForgeV2 instantiated'))
  .map(() => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
