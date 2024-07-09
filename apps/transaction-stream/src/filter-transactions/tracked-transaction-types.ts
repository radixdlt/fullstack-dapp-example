import {
  EventsItem,
  ProgrammaticScryptoSborValueReference
} from '@radixdlt/babylon-gateway-api-sdk'
import { config } from '../config'
import { EventId } from 'common'

type EventEmitter = {
  entity: {
    entity_address: string
    entity_type: string
    is_global: boolean
  }
  type: string
  object_module_id: string
}

export const eventEmittedByComponent =
  (eventName: string, componentAddress: string) => (event: EventsItem) =>
    event.name === eventName &&
    (event.emitter as EventEmitter).entity.entity_address === componentAddress

export const isEmittedByQuestRewards = (event: EventsItem) =>
  (event.emitter as EventEmitter).entity.entity_address === config.radQuest.components.questRewards
export const isEmittedByRefinery = (event: EventsItem) =>
  (event.emitter as EventEmitter).entity.entity_address === config.radQuest.components.refinery

export type TrackedTransactions = Record<EventId, Record<string, (event: EventsItem) => boolean>>

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

const nonFungibleMinted = (resource: string) => (event: EventsItem) =>
  event.name === 'MintNonFungibleResourceEvent' &&
  (event.emitter as EventEmitter)?.entity?.entity_address === resource

export const jettySwapEvent = (component: string) => (event: EventsItem) => {
  return (
    event.name === 'JettySwapEvent' &&
    (event.emitter as EventEmitter).entity.entity_address === component
  )
}

export const getTrackedTransactionTypes = (): TrackedTransactions => ({
  [EventId.QuestRewardDeposited]: {
    RewardDepositedEvent: questRewardsEmitted('RewardDepositedEvent')
  },
  [EventId.QuestRewardClaimed]: {
    RewardClaimedEvent: questRewardsEmitted('RewardClaimedEvent')
  },
  [EventId.DepositHeroBadge]: {
    HeroBadgeDeposited: resourceDeposited(config.radQuest.badges.heroBadgeAddress)
  },
  [EventId.JettyReceivedClams]: {
    DepositEvent: resourceDeposited(
      config.radQuest.resources.clamAddress,
      config.radQuest.accounts.jetty.address
    ),
    WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress)
  },
  [EventId.XrdStaked]: {
    XrdStake: xrdStaked,
    WithdrawEvent: resourceWithdrawn(config.radQuest.xrd)
  },
  [EventId.CombineElementsDeposited]: {
    DepositedEvent: refineryEmitted('CombineElementsDepositedEvent')
  },
  [EventId.CombineElementsMintedRadgem]: {
    MintedRadgemEvent: refineryEmitted('CombineElementsMintedRadgemEvent')
  },
  [EventId.CombineElementsAddedRadgemImage]: {
    AddedRadgemImageEvent: refineryEmitted('CombineElementsAddedRadgemImageEvent')
  },
  [EventId.CombineElementsClaimed]: {
    ClaimedEvent: refineryEmitted('CombineElementsClaimedEvent')
  },
  [EventId.MayaRouterWithdrawEvent]: {
    MayaRouterWithdrawEvent: (event: EventsItem) =>
      event.name === 'MayaRouterWithdrawEvent' &&
      (event.emitter as EventEmitter).entity.entity_address ===
        config.radQuest.components.mayaRouter
  },
  [EventId.InstapassBadgeDeposited]: {
    MintedEvent: nonFungibleMinted(config.radQuest.resources.instapassBadgeAddress),
    DepositedEvent: resourceDeposited(config.radQuest.resources.instapassBadgeAddress)
  },
  [EventId.JettySwap]: {
    WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress),
    JettySwapEvent: jettySwapEvent(config.radQuest.components.jettySwap)
  },
  [EventId.LettySwap]: {
    WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress),
    JettySwapEvent: jettySwapEvent(config.radQuest.components.lettySwap)
  },
  [EventId.AccountAllowedToForgeHeroBadge]: {
    AccountAddedEvent: eventEmittedByComponent(
      'AccountAddedEvent',
      config.radQuest.components.heroBadgeForge
    )
  },
  [EventId.GiftBoxOpened]: {
    GiftBoxOpenedEvent: eventEmittedByComponent(
      'GiftBoxOpenedEvent',
      config.radQuest.components.giftBoxOpener
    )
  },
  [EventId.GiftBoxDeposited]: {
    GiftBoxDepositedEvent: eventEmittedByComponent(
      'GiftBoxDepositedEvent',
      config.radQuest.components.giftBoxOpener
    )
  }
})
