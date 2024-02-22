import { TrackedEvents } from '../tracked-events'

export const isTrackedEvent = (value: string, trackedEvents: TrackedEvents) =>
  trackedEvents[value as keyof TrackedEvents]
