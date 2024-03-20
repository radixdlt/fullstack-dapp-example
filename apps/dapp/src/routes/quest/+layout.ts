import { quests } from '../../stores'
import type { LayoutLoad } from './$types'
import { i18n } from '$lib/i18n/i18n'
import { questApi } from '$lib/api/quest-api'
import type { Quests } from 'content'

export const load: LayoutLoad = async ({ url, fetch }) => {
  const id = url.pathname.split('/')[2] as keyof Quests

  let resolveQuests: (quests: Quests) => void
  let resolveText: (
    text: [title: string, description: string, requirements: Record<string, string>]
  ) => void

  const questsPromise = new Promise<Quests>((resolve) => {
    resolveQuests = resolve
  })

  const textPromise = new Promise<[string, string, Record<string, string>]>((resolve) => {
    resolveText = resolve
  })

  const unsubQuests = quests.subscribe((quests) => {
    if (quests) {
      resolveQuests(quests)
    }
  })

  const unsubText = i18n.subscribe((i18n) => {
    resolveText([
      i18n.t(`${id}.title`, { ns: 'quests' }),
      i18n.t(`${id}.description`, { ns: 'quests' }),
      i18n.t(`${id}.requirements`, { ns: 'quests', returnObjects: true })
    ])
  })

  const _quests = await questsPromise

  const [title, description, requirementsText] = await textPromise

  unsubQuests()
  unsubText()

  const quest = _quests[id]

  let requirements: Record<string, boolean> = {}

  const result = await questApi
    .getQuestInformation(quest.id, fetch)
    .map((data) => data.requirements)

  if (result.isOk()) {
    requirements = result.value
  }

  return {
    questProps: {
      id: quest.id,
      title,
      description,
      minutesToComplete: quest.minutesToComplete,
      rewards: quest.rewards,
      requirements: Object.entries(requirements).map((value) => ({
        text: requirementsText[value[0]],
        complete: value[1]
      }))
    },
    text: quest.text,
    requirements,
    id: quest.id
  }
}
