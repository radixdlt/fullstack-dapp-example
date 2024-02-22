import { QuestDefinitions, MatchField, EventId } from 'content'

type QuestId = string

export type TrackedEvents = {
  DepositEvent: { questId: QuestId; eventId: EventId; matchField: MatchField }[]
}

export const getTrackedEvents = (
  questDefinitions: ReturnType<typeof QuestDefinitions>
): TrackedEvents =>
  Object.entries(questDefinitions)
    .map(([questId, questDefinition]) =>
      Object.entries(questDefinition.requirements)
        .filter(([, requirement]) => requirement.type === 'event')
        .map(([eventId, requirement]) => ({ questId, eventId: eventId as EventId, ...requirement }))
    )
    .flat()
    .reduce<TrackedEvents>(
      (acc, curr) => {
        if (acc[curr.eventName]) acc[curr.eventName].push(curr)
        return acc
      },
      { DepositEvent: [] }
    )
