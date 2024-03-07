import { EventsItem } from '@radixdlt/babylon-gateway-api-sdk'
import { isQuestRewardEvent } from './isQuestRewardEvent'

export const isGloballyTrackedEvent = (event: EventsItem) => isQuestRewardEvent(event)
