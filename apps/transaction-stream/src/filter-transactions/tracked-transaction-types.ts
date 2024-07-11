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

export type TrackedTransactions = Record<EventId, Record<string, (event: EventsItem) => boolean>>

export const eventEmittedByComponent =
  (eventName: string, componentAddress: string) => (event: EventsItem) =>
    event.name === eventName &&
    (event.emitter as EventEmitter).entity.entity_address === componentAddress

const resourceDeposited = (resourceAddress: string, toAccount?: string) => (event: EventsItem) => {
  if (event.name !== 'DepositEvent' || event.data.kind !== 'Enum') return false

  if (toAccount && toAccount !== (event.emitter as EventEmitter).entity.entity_address) return false

  const resourceField = event.data.fields.find(
    (field): field is ProgrammaticScryptoSborValueReference => field.kind === 'Reference'
  )

  return resourceField?.value === resourceAddress
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

const nonFungibleMinted = (resource: string) => (event: EventsItem) =>
  event.name === 'MintNonFungibleResourceEvent' &&
  (event.emitter as EventEmitter)?.entity?.entity_address === resource

export const getTrackedTransactionTypes = (): TrackedTransactions => ({
  [EventId.QuestRewardDeposited]: {
    RewardDepositedEvent: eventEmittedByComponent(
      'RewardDepositedEvent',
      config.radQuest.components.questRewards
    )
  },
  [EventId.QuestRewardClaimed]: {
    RewardClaimedEvent: eventEmittedByComponent(
      'RewardClaimedEvent',
      config.radQuest.components.questRewards
    )
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
    DepositedEvent: eventEmittedByComponent(
      'CombineElementsDepositedEvent',
      config.radQuest.components.refinery
    )
  },
  [EventId.CombineElementsMintedRadgem]: {
    MintedRadgemEvent: eventEmittedByComponent(
      'CombineElementsMintedRadgemEvent',
      config.radQuest.components.refinery
    )
  },
  [EventId.CombineElementsAddedRadgemImage]: {
    AddedRadgemImageEvent: eventEmittedByComponent(
      'CombineElementsAddedRadgemImageEvent',
      config.radQuest.components.refinery
    )
  },
  [EventId.CombineElementsClaimed]: {
    ClaimedEvent: eventEmittedByComponent(
      'CombineElementsClaimedEvent',
      config.radQuest.components.refinery
    )
  },
  [EventId.MayaRouterWithdrawEvent]: {
    MayaRouterWithdrawEvent: eventEmittedByComponent(
      'MayaRouterWithdrawEvent',
      config.radQuest.components.mayaRouter
    )
  },
  [EventId.InstapassBadgeDeposited]: {
    MintedEvent: nonFungibleMinted(config.radQuest.badges.instapassBadgeAddress),
    DepositedEvent: resourceDeposited(config.radQuest.badges.instapassBadgeAddress)
  },
  [EventId.JettySwap]: {
    WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress),
    JettySwapEvent: eventEmittedByComponent('JettySwapEvent', config.radQuest.components.jettySwap)
  },
  [EventId.LettySwap]: {
    WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress),
    JettySwapEvent: eventEmittedByComponent('JettySwapEvent', config.radQuest.components.lettySwap)
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
