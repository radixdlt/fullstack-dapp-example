import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rpdPath = '../../scrypto-packages/radquest/target/wasm32-unknown-unknown/release/radquest.rpd'
const wasmPath =
  '../../scrypto-packages/radquest/target/wasm32-unknown-unknown/release/radquest.wasm'

if (!existsSync(resolve(rpdPath)) || !existsSync(resolve(wasmPath))) {
  throw new Error('rpd and wasm files not found')
}

const rpd = readFileSync(rpdPath)
const wasm = readFileSync(wasmPath)

publishPackageAdvanced({
  rpd,
  wasm,
  adminBadge: config.radQuest.badges.superAdminBadgeAddress
}).map((packageAddress) => {
  const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
  const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')
  const updatedConstantsFileContent = constantsFileContent.replace(
    /radQuestPackage:\s*'package_tdx_2_[^']*'/,
    `radQuestPackage: '${packageAddress}'`
  )
  fs.writeFileSync(envFilePath, updatedConstantsFileContent)

  console.log(`Package deployed at: ${packageAddress}`)
})
