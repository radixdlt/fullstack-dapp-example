import { DepositHeroBadgeJob } from 'queues'
import { config } from '../config'
import { okAsync } from 'neverthrow'
import { QuestId } from 'content'

const { components, accounts, badges } = config.radQuest

export const createDepositHeroBadgeManifest = (items: DepositHeroBadgeJob[]) => {
  const mintHeroBadgeInput = items.map((item) => `"${item.userId}"`).join(', ')
  const completedQuestIds = ['Welcome', 'WhatIsRadix'].map((questId) => `"${questId}"`).join(', ')

  const depositHeroBadgeToAccounts = items
    .map(
      (item, index) => `
      TAKE_NON_FUNGIBLES_FROM_WORKTOP
        Address("${badges.heroBadgeAddress}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("<${item.userId}>")
        )
        Bucket("hero_badge_${index}")
      ;

      CALL_METHOD
        Address("${item.accountAddress}")
        "try_deposit_or_abort"
        Bucket("hero_badge_${index}")
        None
      ;
    `
    )
    .join('\n')

  const manifest = `
CALL_METHOD
  Address("${accounts.payer.accessController}")
  "create_proof"
;

CALL_METHOD
  Address("${accounts.system.accessController}")
  "create_proof"
;

CALL_METHOD
  Address("${accounts.payer.address}")
  "lock_fee"
  Decimal("30")
;

CALL_METHOD
  Address("${accounts.system.address}")
  "create_proof_of_amount"
  Address("${badges.adminBadgeAddress}")
  Decimal("1")
;

CALL_METHOD
  Address("${components.heroBadgeForgeV2}")
  "mint_hero_badges"
  Array<String>(${mintHeroBadgeInput})
  Some(
    Array<String>(
      ${completedQuestIds}
    )
  )
;

${depositHeroBadgeToAccounts}`
  return okAsync(manifest)
}
