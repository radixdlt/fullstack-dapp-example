import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { newGiftBoxOpenerV2 } from '../helpers/newGiftBoxOpenerV2'
import { setGiftBoxAddresses } from '../helpers/setGiftBoxAddresses'
import { logger } from '../../helpers'

const rpdPath =
  '../../scrypto-packages/gift-box-opener-v2/target/wasm32-unknown-unknown/release/gift_box_opener_v2.rpd'
const wasmPath =
  '../../scrypto-packages/gift-box-opener-v2/target/wasm32-unknown-unknown/release/gift_box_opener_v2.wasm'

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
  .map((packageAddress) => (addresses.giftBoxOpenerV2Package = packageAddress))
  .map(() => logger.debug('Package deployed', '\n'))
  .andThen(() =>
    mintAdminBadge({
      adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
      superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
      amount: 1
    })
  )
  .map(() => logger.debug('Admin Badge minted', '\n'))
  .andThen(() => newGiftBoxOpenerV2(addresses.giftBoxOpenerV2Package))
  .map((res) => Object.assign(addresses, res))
  .map(() => logger.debug('GiftBoxOpenerV2 instantiated', '\n'))
  .andThen(() => setGiftBoxAddresses(addresses.giftBoxOpenerV2))
  .map(() => logger.debug('Gift Box addresses set', '\n'))
  .map(() => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
