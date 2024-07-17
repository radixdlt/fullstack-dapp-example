import {
  EventsItem,
  ProgrammaticScryptoSborValueArray,
  ProgrammaticScryptoSborValueReference,
  ProgrammaticScryptoSborValueTuple
} from '@radixdlt/babylon-gateway-api-sdk'
import { config } from '../config'
import { EventId, GetValuesFromEventInput, getValuesFromEvent } from 'common'
import { getRewardsFromQuestRewardDepositedEvent } from '../helpers/getRewardsFromQuestRewardDepositedEvent'
import { keysIn } from 'ramda'

type EventEmitter = {
  entity: {
    entity_address: string
    entity_type: string
    is_global: boolean
  }
  type: string
  object_module_id: string
}

export type TrackedTransactions = Record<
  EventId,
  Record<string, (event: EventsItem) => Record<string, unknown> | undefined>
>

const eventEmittedByComponent =
  ({
    eventName,
    componentAddress,
    keys
  }: {
    eventName: string
    componentAddress: string
    keys: GetValuesFromEventInput
  }) =>
  (event: EventsItem) => {
    const isMatch =
      event.name === eventName &&
      (event.emitter as EventEmitter).entity.entity_address === componentAddress

    return isMatch ? getValuesFromEvent(keys, event) : undefined
  }

const resourceDeposited =
  ({
    resourceAddress,
    toAccount,
    key
  }: {
    resourceAddress: string
    toAccount?: string
    key?: string
  }) =>
  (event: EventsItem) => {
    if (event.name !== 'DepositEvent' || event.data.kind !== 'Enum') return undefined

    if (toAccount && toAccount !== (event.emitter as EventEmitter).entity.entity_address)
      return undefined

    const resourceField = event.data.fields.find(
      (field): field is ProgrammaticScryptoSborValueReference => field.kind === 'Reference'
    )

    const isMatch = resourceField?.value === resourceAddress
    const entity_address = (event.emitter as { entity: { entity_address: string } }).entity
      .entity_address
    const keyValue = key ? { [key]: entity_address } : {}

    return isMatch ? keyValue : undefined
  }

export const resourceWithdrawn = (resourceAddress: string, key?: string) => (event: EventsItem) => {
  if (event.name !== 'WithdrawEvent' || event.data.kind !== 'Enum') return undefined
  const entity_address = (event.emitter as { entity: { entity_address: string } }).entity
    .entity_address

  const values = getValuesFromEvent({ ResourceAddress: { kind: 'Reference' } }, event)

  const isMatch = values.ResourceAddress === resourceAddress

  const keyValue = key ? { [key]: entity_address } : {}

  return isMatch && entity_address ? keyValue : undefined
}

const xrdStaked = (event: EventsItem) => {
  const isMatch =
    event.name === 'StakeEvent' &&
    (event.emitter as EventEmitter)?.entity.entity_type === 'GlobalValidator'
  return isMatch ? {} : undefined
}

const nonFungibleMinted =
  (resource: string, keys: GetValuesFromEventInput) => (event: EventsItem) => {
    const isMatch =
      event.name === 'MintNonFungibleResourceEvent' &&
      (event.emitter as EventEmitter)?.entity?.entity_address === resource
    return isMatch ? getValuesFromEvent(keys, event) : {}
  }

export const trackedTransactionTypes: TrackedTransactions = {
  [EventId.QuestRewardDeposited]: {
    RewardDepositedEvent: eventEmittedByComponent({
      eventName: 'RewardDepositedEvent',
      componentAddress: config.radQuest.components.questRewards,
      keys: {
        user_id: { kind: 'String', key: 'userId' },
        quest_id: { kind: 'String', key: 'questId' },
        rewards: {
          kind: 'Array',
          key: 'rewards',
          transform: (value) =>
            getRewardsFromQuestRewardDepositedEvent(value as ProgrammaticScryptoSborValueArray)
        }
      }
    })
  },
  [EventId.QuestRewardClaimed]: {
    RewardClaimedEvent: eventEmittedByComponent({
      eventName: 'RewardClaimedEvent',
      componentAddress: config.radQuest.components.questRewards,
      keys: {
        user_id: { kind: 'String', key: 'userId' },
        quest_id: { kind: 'String', key: 'questId' },
        rewards: {
          kind: 'Array',
          key: 'rewards',
          transform: (value) =>
            getRewardsFromQuestRewardDepositedEvent(value as ProgrammaticScryptoSborValueArray)
        }
      }
    })
  },
  [EventId.DepositHeroBadge]: {
    HeroBadgeDeposited: eventEmittedByComponent({
      componentAddress: config.radQuest.components.heroBadgeForge,
      eventName: 'BadgeClaimedEvent',
      keys: { user_id: { kind: 'String', key: 'userId' } }
    })
  },
  [EventId.JettyReceivedClams]: {
    DepositEvent: resourceDeposited({
      resourceAddress: config.radQuest.resources.clamAddress,
      toAccount: config.radQuest.accounts.jetty.address
    }),
    WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress, 'accountAddress')
  },
  [EventId.XrdStaked]: {
    XrdStake: xrdStaked,
    WithdrawEvent: resourceWithdrawn(config.radQuest.xrd, 'accountAddress')
  },
  [EventId.CombineElementsDeposited]: {
    DepositedEvent: eventEmittedByComponent({
      eventName: 'CombineElementsDepositedEvent',
      componentAddress: config.radQuest.components.refinery,
      keys: { user_id: { kind: 'String', key: 'userId' } }
    })
  },
  [EventId.CombineElementsMintedRadgem]: {
    MintedRadgemEvent: eventEmittedByComponent({
      eventName: 'CombineElementsMintedRadgemEvent',
      componentAddress: config.radQuest.components.refinery,
      keys: {
        user_id: { kind: 'String', key: 'userId' },
        radgem_local_id: { kind: 'NonFungibleLocalId', key: 'radgemLocalId' },
        radgem_data: {
          kind: 'Tuple',
          key: 'radgemData',
          transform: (value) => {
            const tupleValue = value as ProgrammaticScryptoSborValueTuple
            const fieldNameToKey = new Map<string, string>([
              ['key_image_url', 'keyImageUrl'],
              ['name', 'name'],
              ['description', 'description'],
              ['material', 'material'],
              ['color', 'color'],
              ['rarity', 'rarity'],
              ['quality', 'quality']
            ])
            const radGemData = tupleValue.fields.reduce<Record<string, unknown>>((acc, field) => {
              field.type_name
              const fieldName = typeof field.field_name === 'string' ? field.field_name : ''
              const key = fieldNameToKey.get(fieldName)
              const value =
                field.kind === 'String'
                  ? field.value
                  : field.kind === 'Decimal'
                    ? parseInt(field.value)
                    : ''

              return key ? { ...acc, [key]: value } : acc
            }, {})

            return radGemData
          }
        }
      }
    })
  },
  [EventId.CombineElementsAddedRadgemImage]: {
    AddedRadgemImageEvent: eventEmittedByComponent({
      eventName: 'CombineElementsAddedRadgemImageEvent',
      componentAddress: config.radQuest.components.refinery,
      keys: { user_id: { kind: 'String', key: 'userId' } }
    })
  },
  [EventId.CombineElementsClaimed]: {
    ClaimedEvent: eventEmittedByComponent({
      eventName: 'CombineElementsClaimedEvent',
      componentAddress: config.radQuest.components.refinery,
      keys: { user_id: { kind: 'String', key: 'userId' } }
    })
  },
  [EventId.MayaRouterWithdrawEvent]: {
    MayaRouterWithdrawEvent: eventEmittedByComponent({
      eventName: 'MayaRouterWithdrawEvent',
      componentAddress: config.radQuest.components.mayaRouter,
      keys: { intended_recipient: { kind: 'Reference', key: 'accountAddress' } }
    })
  },
  [EventId.InstapassBadgeDeposited]: {
    MintedEvent: nonFungibleMinted(config.radQuest.badges.instapassBadgeAddress, {}),
    DepositedEvent: resourceDeposited({
      resourceAddress: config.radQuest.badges.instapassBadgeAddress,
      key: 'accountAddress'
    })
  },
  [EventId.JettySwap]: {
    WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress),
    ClamSwapEvent: eventEmittedByComponent({
      eventName: 'ClamSwapEvent',
      componentAddress: config.radQuest.components.jettySwap,
      keys: {}
    })
  },
  [EventId.LettySwap]: {
    WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress),
    ClamSwapEvent: eventEmittedByComponent({
      eventName: 'ClamSwapEvent',
      componentAddress: config.radQuest.components.lettySwap,
      keys: {}
    })
  },
  [EventId.AccountAllowedToForgeHeroBadge]: {
    AccountAddedEvent: eventEmittedByComponent({
      eventName: 'AccountAddedEvent',
      componentAddress: config.radQuest.components.heroBadgeForge,
      keys: {
        account: { kind: 'Reference', key: 'accountAddress' },
        user_id: { kind: 'String', key: 'userId' }
      }
    })
  },
  [EventId.GiftBoxOpened]: {
    GiftBoxOpenedEvent: eventEmittedByComponent({
      eventName: 'GiftBoxOpenedEvent',
      componentAddress: config.radQuest.components.giftBoxOpener,
      keys: {
        user_id: { kind: 'String', key: 'userId' },
        resource_address: { kind: 'Reference', key: 'giftBoxResourceAddress' }
      }
    })
  },
  [EventId.GiftBoxDeposited]: {
    GiftBoxDepositedEvent: eventEmittedByComponent({
      eventName: 'GiftBoxDepositedEvent',
      componentAddress: config.radQuest.components.giftBoxOpener,
      keys: { user_id: { kind: 'String', key: 'userId' } }
    })
  }
} as const
