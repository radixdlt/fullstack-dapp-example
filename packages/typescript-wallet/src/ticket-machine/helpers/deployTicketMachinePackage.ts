import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'
import { logger } from '../../helpers'

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
    .map((packageAddress) => (addresses.ticketMachinePackage = packageAddress))
    .map(() => logger.debug('TickerMachine package deployed'))
    .map(() => addresses)
