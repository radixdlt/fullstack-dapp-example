import {
  EventsItem,
  ProgrammaticScryptoSborValueArray,
  ProgrammaticScryptoSborValueReference
} from '@radixdlt/babylon-gateway-api-sdk'
import { config } from '../config'
import {
  EventId,
  GetValuesFromEventInput,
  getValuesFromEvent,
  EventEmitter,
  SborHelper
} from 'common'
import { getRewardsFromQuestRewardDepositedEvent } from '../helpers/getRewardsFromQuestRewardDepositedEvent'

export type TrackedTransactions = Record<
  EventId,
  Record<string, (event: EventsItem) => Record<string, unknown> | undefined>
>

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

const nonFungibleMinted =
  (resource: string, keys: GetValuesFromEventInput) => (event: EventsItem) => {
    const isMatch =
      event.name === 'MintNonFungibleResourceEvent' &&
      (event.emitter as EventEmitter)?.entity?.entity_address === resource
    return isMatch ? getValuesFromEvent(keys, event) : {}
  }

const matchEvent = (eventName: string, componentAddress: string, event: EventsItem) =>
  event.name === eventName &&
  (event.emitter as EventEmitter).entity.entity_address === componentAddress

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
  [EventId.QuestRewardDepositedV2]: {
    RewardDepositedEvent: (event: EventsItem) => {
      if (matchEvent('RewardDepositedEvent', config.radQuest.components.questRewardsV2, event)) {
        const tupleFields = SborHelper.getTupleFields(event.data)

        if (tupleFields) {
          const items = tupleFields
            .map(SborHelper.getArrayElements)
            .flat()
            .filter((item) => !!item)
            .map(SborHelper.getTupleFields)
            .filter((item) => !!item)
            .map((item) => {
              const [userIdField, questIdField] = item
              return {
                userId: SborHelper.getStringFieldValue(userIdField),
                questId: SborHelper.getStringFieldValue(questIdField)
              }
            })

          return { items, isBatch: true }
        }
      }

      return undefined
    }
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
  [EventId.QuestRewardClaimedV2]: {
    RewardClaimedEvent: eventEmittedByComponent({
      eventName: 'RewardClaimedEvent',
      componentAddress: config.radQuest.components.questRewardsV2,
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
  [EventId.DepositedElements]: {
    AddedRadgemImageEvent: eventEmittedByComponent({
      eventName: 'DepositedElementsEvent',
      componentAddress: config.radQuest.components.radgemForgeV2,
      keys: {
        user_id: { kind: 'String', key: 'userId' },
        elements_count: { kind: 'Decimal', key: 'elementsCount' }
      }
    })
  },
  [EventId.MayaRouterWithdrawEvent]: {
    MayaRouterWithdrawEvent: eventEmittedByComponent({
      eventName: 'MayaRouterWithdrawEvent',
      componentAddress: config.radQuest.components.mayaRouter,
      keys: { intended_recipient: { kind: 'Reference', key: 'accountAddress' } }
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
  [EventId.GiftBoxesOpenedEvent]: {
    GiftBoxesOpenedEvent: eventEmittedByComponent({
      eventName: 'GiftBoxesOpenedEvent',
      componentAddress: config.radQuest.components.giftBoxOpenerV2,
      keys: {
        user_id: { kind: 'String', key: 'userId' },
        resource_address: { kind: 'Reference', key: 'giftBoxResourceAddress' },
        quantity: { kind: 'Decimal', key: 'quantity' }
      }
    })
  }
} as const
