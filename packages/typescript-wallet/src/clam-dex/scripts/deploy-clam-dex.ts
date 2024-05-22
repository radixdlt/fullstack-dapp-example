import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'

const rpdPath = '../../scrypto-packages/clam-dex/target/wasm32-unknown-unknown/release/clam_dex.rpd'
const wasmPath =
  '../../scrypto-packages/clam-dex/target/wasm32-unknown-unknown/release/clam_dex.wasm'

if (!existsSync(resolve(rpdPath)) || !existsSync(resolve(wasmPath))) {
  throw new Error('rpd and wasm files not found')
}

const rpd = readFileSync(rpdPath)
const wasm = readFileSync(wasmPath)

publishPackageAdvanced({
  rpd,
  wasm,
  adminBadge: config.radQuest.badges.superAdminBadgeAddress
}).map((packageAddress) => console.log(`Package deployed at: ${packageAddress}`))
