import { QuestCompletedJob } from 'queues'
import { config } from '../config'
import { okAsync } from 'neverthrow'

const { components, accounts, badges } = config.radQuest

export const createCompletedQuestManifest = (items: QuestCompletedJob[]) => {
  const completedQuestTuples = items
    .map(
      (item) =>
        `Tuple(
          "${item.userId}",
          Array<String>("${item.questId}")
        )`
    )
    .join(', ')

  return okAsync(`
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
      "heroes_completed_quests"
      Array<Tuple>(
        ${completedQuestTuples}
      )
    ;`)
}
