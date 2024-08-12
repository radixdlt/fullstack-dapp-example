import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { newCardForgeV2 } from '../helpers/newCardForgeV2'
import { logger } from '../../helpers'

const rpdPath =
  '../../scrypto-packages/card-forge-v2/target/wasm32-unknown-unknown/release/card_forge_v2.rpd'
const wasmPath =
  '../../scrypto-packages/card-forge-v2/target/wasm32-unknown-unknown/release/card_forge_v2.wasm'

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
  .map((packageAddress) => (addresses.cardForgeV2Package = packageAddress))
  .map(() => logger.debug('Package deployed'))
  .andThen(() =>
    mintAdminBadge({
      adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
      superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
      amount: 1
    })
  )
  .map(() => logger.debug('Admin Badge minted'))
  .andThen(() => newCardForgeV2(addresses.cardForgeV2Package))
  .map((res) => Object.assign(addresses, res))
  .map(() => logger.debug('CardForgeV2 instantiated'))
  .map(() => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
