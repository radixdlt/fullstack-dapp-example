import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { publishPackageAdvanced } from '../../helpers/publish-package-advanced'
import { config } from '../../config'
import { newQuestRewardsV2 } from '../helpers/newQuestRewardsV2'
import { mintAdminBadge } from '../../radquest/helpers/mintAdminBadge'
import { logger } from '../../helpers'

const rpdPath =
  '../../scrypto-packages/quest-rewards-v2/target/wasm32-unknown-unknown/release/quest_rewards_v2.rpd'
const wasmPath =
  '../../scrypto-packages/quest-rewards-v2/target/wasm32-unknown-unknown/release/quest_rewards_v2.wasm'

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
  .map((packageAddress) => (addresses.questRewardsV2Package = packageAddress))
  .map(() => logger.debug('Package deployed'))
  .andThen(() =>
    mintAdminBadge({
      adminBadgeAddress: config.radQuest.badges.adminBadgeAddress,
      superAdminBadgeAddress: config.radQuest.badges.superAdminBadgeAddress,
      amount: 1
    })
  )
  .map(() => logger.debug('Admin Badge minted'))
  .andThen(() => newQuestRewardsV2(addresses.questRewardsV2Package))
  .map((res) => Object.assign(addresses, res))
  .map(() => logger.debug('QuestRewardsV2 instantiated'))
  .map(() => logger.debug(addresses))
  .mapErr((err) => logger.error(err))
