import { EventId } from '../constants'

import * as v from 'valibot'

type EventDataSchema = v.InferInput<typeof EventDataSchema>
const EventDataSchema = v.variant('type', [
  v.object({
    type: v.literal(EventId.QuestRewardDeposited),
    transactionId: v.string(),
    user_id: v.string(),
    quest_id: v.string()
  }),
  v.object({
    type: v.literal(EventId.QuestRewardClaimed),
    user_id: v.string(),
    quest_id: v.string(),
    rewards: v.string()
  }),
  v.object({
    type: v.literal(EventId.DepositHeroBadge),
    user_id: v.string()
  }),
  v.object({
    type: v.literal(EventId.JettyReceivedClams),
    user_id: v.string()
  })
])

// export const trackedTransactionTypes: TrackedTransactions = {
//   [EventId.QuestRewardDeposited]: {
//     RewardDepositedEvent: eventEmittedByComponent({
//       eventName: 'RewardDepositedEvent',
//       componentAddress: config.radQuest.components.questRewards,
//       keys: { user_id: 'String', quest_id: 'String' }
//     })
//   },
//   [EventId.QuestRewardClaimed]: {
//     RewardClaimedEvent: eventEmittedByComponent({
//       eventName: 'RewardClaimedEvent',
//       componentAddress: config.radQuest.components.questRewards,
//       keys: { user_id: 'String', quest_id: 'String', rewards: 'Array' }
//     })
//   },
//   [EventId.DepositHeroBadge]: {
//     HeroBadgeDeposited: eventEmittedByComponent({
//       componentAddress: config.radQuest.components.heroBadgeForge,
//       eventName: 'BadgeClaimedEvent',
//       keys: { user_id: 'String' }
//     })
//   },
//   [EventId.JettyReceivedClams]: {
//     DepositEvent: resourceDeposited({
//       resourceAddress: config.radQuest.resources.clamAddress,
//       toAccount: config.radQuest.accounts.jetty.address
//     }),
//     WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress)
//   },
//   [EventId.XrdStaked]: {
//     XrdStake: xrdStaked,
//     WithdrawEvent: resourceWithdrawn(config.radQuest.xrd)
//   },
//   [EventId.CombineElementsDeposited]: {
//     DepositedEvent: eventEmittedByComponent({
//       eventName: 'CombineElementsDepositedEvent',
//       componentAddress: config.radQuest.components.refinery,
//       keys: { user_id: 'String' }
//     })
//   },
//   [EventId.CombineElementsMintedRadgem]: {
//     MintedRadgemEvent: eventEmittedByComponent({
//       eventName: 'CombineElementsMintedRadgemEvent',
//       componentAddress: config.radQuest.components.refinery,
//       keys: { user_id: 'String', radgem_local_id: 'NonFungibleLocalId' }
//     })
//   },
//   [EventId.CombineElementsAddedRadgemImage]: {
//     AddedRadgemImageEvent: eventEmittedByComponent({
//       eventName: 'CombineElementsAddedRadgemImageEvent',
//       componentAddress: config.radQuest.components.refinery,
//       keys: { user_id: 'String' }
//     })
//   },
//   [EventId.CombineElementsClaimed]: {
//     ClaimedEvent: eventEmittedByComponent({
//       eventName: 'CombineElementsClaimedEvent',
//       componentAddress: config.radQuest.components.refinery,
//       keys: { user_id: 'String' }
//     })
//   },
//   [EventId.MayaRouterWithdrawEvent]: {
//     MayaRouterWithdrawEvent: eventEmittedByComponent({
//       eventName: 'MayaRouterWithdrawEvent',
//       componentAddress: config.radQuest.components.mayaRouter,
//       keys: {}
//     })
//   },
//   [EventId.InstapassBadgeDeposited]: {
//     MintedEvent: nonFungibleMinted(config.radQuest.badges.instapassBadgeAddress, {}),
//     DepositedEvent: resourceDeposited({
//       resourceAddress: config.radQuest.badges.instapassBadgeAddress
//     })
//   },
//   [EventId.JettySwap]: {
//     WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress),
//     JettySwapEvent: eventEmittedByComponent({
//       eventName: 'JettySwapEvent',
//       componentAddress: config.radQuest.components.jettySwap,
//       keys: {}
//     })
//   },
//   [EventId.LettySwap]: {
//     WithdrawEvent: resourceWithdrawn(config.radQuest.resources.clamAddress),
//     JettySwapEvent: eventEmittedByComponent({
//       eventName: 'JettySwapEvent',
//       componentAddress: config.radQuest.components.lettySwap,
//       keys: {}
//     })
//   },
//   [EventId.AccountAllowedToForgeHeroBadge]: {
//     AccountAddedEvent: eventEmittedByComponent({
//       eventName: 'AccountAddedEvent',
//       componentAddress: config.radQuest.components.heroBadgeForge,
//       keys: { account: 'Reference' }
//     })
//   },
//   [EventId.GiftBoxOpened]: {
//     GiftBoxOpenedEvent: eventEmittedByComponent({
//       eventName: 'GiftBoxOpenedEvent',
//       componentAddress: config.radQuest.components.giftBoxOpener,
//       keys: { user_id: 'String', resource_address: 'Reference' }
//     })
//   },
//   [EventId.GiftBoxDeposited]: {
//     GiftBoxDepositedEvent: eventEmittedByComponent({
//       eventName: 'GiftBoxDepositedEvent',
//       componentAddress: config.radQuest.components.giftBoxOpener,
//       keys: { user_id: 'String' }
//     })
//   }
// } as const
