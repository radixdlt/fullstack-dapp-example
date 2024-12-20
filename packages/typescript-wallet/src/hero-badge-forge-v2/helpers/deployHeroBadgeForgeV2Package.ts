import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'
import { logger } from '../../helpers/index'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

// Define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    .map((packageAddress) => {
      addresses.heroBadgeForgeV2Package = packageAddress

      const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
      const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')
      const updatedConstantsFileContent = constantsFileContent.replace(
        /heroBadgeForgeV2Package:\s*'package_tdx_2_[^']*'/,
        `heroBadgeForgeV2Package: '${packageAddress}'`
      )
      fs.writeFileSync(envFilePath, updatedConstantsFileContent)
    })
    .map(() => logger.debug('HeroBadgeForgeV2 package deployed'))
    .map(() => addresses)
