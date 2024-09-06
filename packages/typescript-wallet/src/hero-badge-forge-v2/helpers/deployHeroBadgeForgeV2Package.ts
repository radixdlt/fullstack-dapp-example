import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'
import { logger } from '../../helpers/index'

const rpdPath =
  '../../scrypto-packages/hero-badge-forge-v2/target/wasm32-unknown-unknown/release/hero_badge_forge_v2.rpd'
const wasmPath =
  '../../scrypto-packages/hero-badge-forge-v2/target/wasm32-unknown-unknown/release/hero_badge_forge_v2.wasm'

if (!existsSync(resolve(rpdPath)) || !existsSync(resolve(wasmPath))) {
  throw new Error('rpd and wasm files not found')
}

const rpd = readFileSync(rpdPath)
const wasm = readFileSync(wasmPath)

export const deployHeroBadgeForgeV2Package = (addresses: Record<string, string>) =>
  publishPackageAdvanced({
    rpd,
    wasm,
    adminBadge: config.radQuest.badges.superAdminBadgeAddress
  })
    .map((packageAddress) => (addresses.heroBadgeForgeV2Package = packageAddress))
    .map(() => logger.debug('HeroBadgeForgeV2 package deployed'))
    .map(() => addresses)
