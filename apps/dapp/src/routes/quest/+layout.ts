import { questRequirements, questStatus, quests, user } from '../../stores'
import type { LayoutLoad } from './$types'
import { i18n } from '$lib/i18n/i18n'
import { questApi } from '$lib/api/quest-api'
import { goto } from '$app/navigation'
import type { QuestStatus } from '../../types'
import type { QuestId, Quests, Requirement } from 'content'
import type { User } from 'database'

export const load: LayoutLoad = async ({ url, fetch }) => {
  const id = url.pathname.split('/')[2] as QuestId

  let resolveQuestStatus: (status: Record<QuestId, QuestStatus>) => void

  const questStatusPromise = new Promise<Record<QuestId, QuestStatus>>((resolve) => {
    resolveQuestStatus = resolve
  })

  const unsubQuestStatus = questStatus.subscribe((status) => {
    if (status) {
      resolveQuestStatus(status)
    }
  })

  let resolveUser: (user: User | undefined) => void

  const userPromise = new Promise<User | undefined>((resolve) => {
    resolveUser = resolve
  })

  const unsubUser = user.subscribe((user) => {
    resolveUser(user)
  })

  const status = await questStatusPromise

  unsubQuestStatus()

  if (status[id] === 'locked') {
    goto('/')
  }

  let resolveText: (
    text: [title: string, description: string, requirements: Record<string, string>]
  ) => void

  const textPromise = new Promise<[string, string, Record<string, string>]>((resolve) => {
    resolveText = resolve
  })

  const unsubText = i18n.subscribe((i18n) => {
    resolveText([
      i18n.t(`${id}.title`, { ns: 'quests' }),
      i18n.t(`${id}.introDescription`, { ns: 'quests' }),
      i18n.t(`${id}.requirements`, { ns: 'quests', returnObjects: true })
    ])
  })

  const [title, description, requirementsText] = await textPromise

  unsubText()

  let resolveQuests: (quests: Quests) => void

  const questsPromise = new Promise<Quests>((resolve) => {
    resolveQuests = resolve
  })

  const unsubQuests = quests.subscribe((quests) => {
    if (quests) {
      resolveQuests(quests)
    }
  })

  let resolveRequirements: (
    requirements: {
      id: string
      complete: boolean
      text: string
      type: Requirement['type']
    }[]
  ) => void

  const requirementsPromise = new Promise<
    {
      id: string
      complete: boolean
      text: string
      type: Requirement['type']
    }[]
  >((resolve) => {
    resolveRequirements = resolve
  })

  const unsubRequirements = questRequirements.subscribe((requirements) => {
    if (!requirements[id]) return
    resolveRequirements(requirements[id])
  })

  const requirements = await requirementsPromise
  unsubRequirements()

  const _quests = await questsPromise
  const quest = _quests[id]

  unsubQuests()

  const _user = await userPromise

  unsubUser()

  if (_user) {
    const updateResult = await questApi.updateQuestProgress(id, 0, fetch)

    if (updateResult.isErr() && updateResult.error.reason === 'preRequisiteNotMet') {
      goto('/')
    }

    let requirements: Record<string, boolean> = {}

    const result = await questApi
      .getQuestInformation(quest.id, fetch)
      .map((data) => data.requirements)

    requirements = result._unsafeUnwrap()

    questRequirements.update((prev) => ({
      ...prev,
      [id]: Object.entries(requirements).map((value) => ({
        id: value[0] as QuestId,
        text: requirementsText[value[0]],
        complete: value[1],
        type: quest.requirements[value[0]].type
      }))
    }))
  }

  return {
    questProps: {
      id,
      title,
      description,
      minutesToComplete: quest.minutesToComplete,
      rewards: quest.rewards,
      jettyClaimHtml: (quest.text['claim.md'] as string) ?? '',
      jettyCompleteHtml: (quest.text['complete.md'] as string) ?? ''
    },
    id,
    text: quest.text,
    requirements: requirements.reduce(
      (acc, requirement) => {
        acc[requirement.id] = requirement.complete
        return acc
      },
      {} as Record<string, boolean>
    )
  }
}
