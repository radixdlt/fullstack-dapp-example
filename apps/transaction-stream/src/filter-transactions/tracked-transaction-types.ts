import {
  EventsItem,
  ProgrammaticScryptoSborValueReference
} from '@radixdlt/babylon-gateway-api-sdk'
import { config } from '../config'
import { EventJobType } from 'queues'

type EventEmitter = {
  entity: {
    entity_address: string
    entity_type: string
    is_global: boolean
  }
  type: string
  object_module_id: string
}

export const isEmittedByQuestRewards = (event: EventsItem) =>
  (event.emitter as EventEmitter).entity.entity_address === config.radQuest.components.questRewards
export const isEmittedByRefinery = (event: EventsItem) =>
  (event.emitter as EventEmitter).entity.entity_address === config.radQuest.components.refinery

export type TrackedTransactions = Record<
  EventJobType,
  Record<string, (event: EventsItem) => boolean>
>

const resourceDeposited = (resource: string, toAccount?: string) => (event: EventsItem) => {
  if (event.name !== 'DepositEvent' || event.data.kind !== 'Enum') return false

  if (toAccount && toAccount !== (event.emitter as EventEmitter).entity.entity_address) return false

  const resourceField = event.data.fields.find(
    (field): field is ProgrammaticScryptoSborValueReference => field.kind === 'Reference'
  )

  return resourceField?.value === resource
}

export const resourceWithdrawn = (resource: string) => (event: EventsItem) => {
  if (event.name !== 'WithdrawEvent' || event.data.kind !== 'Enum') return false

  const resourceField = event.data.fields.find(
    (field): field is ProgrammaticScryptoSborValueReference => field.kind === 'Reference'
  )

  return resourceField?.value === resource
}

export const xrdStaked = (event: EventsItem) => {
  return (
    event.name === 'StakeEvent' &&
    (event.emitter as EventEmitter)?.entity.entity_type === 'GlobalValidator'
  )
}

const questRewardsEmitted = (eventName: string) => (event: EventsItem) =>
  event.name === eventName && isEmittedByQuestRewards(event)
const refineryEmitted = (eventName: string) => (event: EventsItem) =>
  event.name === eventName && isEmittedByRefinery(event)

export const getTrackedTransactionTypes = (): TrackedTransactions => ({
  QuestRewardDeposited: {
    RewardDepositedEvent: questRewardsEmitted('RewardDepositedEvent')
  },
  QuestRewardClaimed: {
    RewardClaimedEvent: questRewardsEmitted('RewardClaimedEvent')
  },
  UserBadge: {
    UserBadgeDeposited: resourceDeposited(config.radQuest.badges.userBadgeAddress),
    XrdDeposited: resourceDeposited(config.radQuest.xrd)
  },
  JettyReceivedClams: {
    DepositEvent: resourceDeposited(
      config.radQuest.resources.clamAddress,
      config.radQuest.accounts.jetty
    ),
    WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress)
  },
  XrdStaked: {
    XrdStake: xrdStaked,
    WithdrawEvent: resourceWithdrawn(config.radQuest.xrd)
  },
  CombineElementsDeposited: {
    DepositedEvent: refineryEmitted('CombineElementsDepositedEvent')
  },
  CombineElementsMintedRadgem: {
    MintedRadgem: refineryEmitted('CombineElementsMintedRadgemEvent')
  },
  CombineElementsAddedRadgemImage: {
    AddedRadgemImage: refineryEmitted('CombineElementsAddedRadgemImageEvent')
  },
  CombineElementsClaimed: {
    ClaimedEvent: refineryEmitted('CombineElementsClaimedEvent')
  }
})
