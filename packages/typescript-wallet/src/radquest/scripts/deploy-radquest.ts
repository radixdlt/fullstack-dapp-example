import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'

const rpdPath = '../../scrypto-package/target/wasm32-unknown-unknown/release/radquest.rpd'
const wasmPath = '../../scrypto-package/target/wasm32-unknown-unknown/release/radquest.wasm'

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
