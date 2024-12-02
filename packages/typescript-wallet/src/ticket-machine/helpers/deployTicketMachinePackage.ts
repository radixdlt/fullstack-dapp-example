import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'
import { logger } from '../../helpers'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rpdPath =
  '../../scrypto-packages/ticket-machine/target/wasm32-unknown-unknown/release/ticket_machine.rpd'
const wasmPath =
  '../../scrypto-packages/ticket-machine/target/wasm32-unknown-unknown/release/ticket_machine.wasm'

if (!existsSync(resolve(rpdPath)) || !existsSync(resolve(wasmPath))) {
  throw new Error('rpd and wasm files not found')
}

const rpd = readFileSync(rpdPath)
const wasm = readFileSync(wasmPath)

export const deployTicketMachinePackage = (addresses: Record<string, string>) =>
  publishPackageAdvanced({
    rpd,
    wasm,
    adminBadge: config.radQuest.badges.superAdminBadgeAddress
  })
    .map((packageAddress) => {
      addresses.ticketMachinePackage = packageAddress

      const envFilePath = path.resolve(__dirname, '../../../../../packages/common/src/constants.ts')
      const constantsFileContent = fs.readFileSync(envFilePath, 'utf8')
      const updatedConstantsFileContent = constantsFileContent.replace(
        /ticketMachinePackage:\s*'package_tdx_2_[^']*'/,
        `ticketMachinePackage: '${packageAddress}'`
      )
      fs.writeFileSync(envFilePath, updatedConstantsFileContent)
    })
    .map(() => logger.debug('TickerMachine package deployed'))
    .map(() => addresses)
