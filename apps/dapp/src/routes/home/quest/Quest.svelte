<script lang="ts">
  import { page } from '$app/stores'
  import { questApi } from '$lib/api/quest-api'
  import Quest, {
    type JettyStep,
    type RegularStep,
    type _Step
  } from '$lib/components/quest/Quest.svelte'
  import { onMount, type ComponentProps } from 'svelte'
  import { closeQuest } from './+layout.svelte'
  import { jettyDialog, quests, showJetty, user } from '../../../stores'
  import ClaimRewards from './ClaimRewards.svelte'
  import VerifyRequirements from './VerifyRequirements.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import type { QuestId } from 'content'
  import { useCookies, type RequirementCookieKey } from '$lib/utils/cookies'
  import { completeQuest } from '$lib/utils/complete-quest'
  import { useLocalStorage } from '$lib/utils/local-storage'
  import CompleteQuest from './CompleteQuest.svelte'

  type CompleteStep = _Step<'complete'> & { id: 'complete' }

  type RequirementStep = _Step<'requirements'> & { id: 'requirements' }

  type ClaimRewardsStep = _Step<'claimRewards'> & { id: 'claimRewards' }

  export let id: QuestId
  export let steps: (
    | RegularStep
    | JettyStep<any>
    | Omit<RequirementStep, 'id'>
    | Omit<ClaimRewardsStep, 'id'>
    | Omit<CompleteStep, 'id'>
  )[]
  export let requirements: Record<string, boolean>
  export let render: (id: string) => boolean = () => false

  export const actions = {
    next: () => {},
    back: () => {},
    goToStep: (_id: string) => {}
  }

  const saveProgress = (progress: number) => {
    if ($user) {
      questApi.saveProgress(id, progress)
    }
    // @ts-ignore
    useCookies(`saved-progress-${id}`).set(progress)
    useLocalStorage('savedProgress').set({
      questId: id,
      progress
    })
  }

  let quest: Quest

  onMount(() => {
    actions.next = quest.next
    actions.back = quest.back
    actions.goToStep = quest.goToStep

    if ($page.url.hash) {
      quest.setProgress(parseInt($page.url.hash.slice(1)))
    } else {
      const savedProgress = useCookies(`saved-progress-${id}`).get()
      if (savedProgress) {
        quest.setProgress(parseInt(savedProgress))
      }
    }

    $showJetty = false

    return () => {
      $showJetty = true
    }
  })

  const _completeQuest = async () => {
    await completeQuest(id, !!$user)
    $jettyDialog = undefined
    setTimeout(closeQuest, 0)
  }

  const progressUpdated = (e: CustomEvent<number>) => {
    saveProgress(e.detail)

    if (e.detail !== steps.length - 1) return

    const contentRequirement = Object.values($quests[id].requirements).find(
      (requirement) => requirement.type === 'content'
    )?.id

    if (contentRequirement) {
      if ($user) {
        questApi.completeContentRequirement(id)
      } else {
        useCookies(`requirement-${id}-${contentRequirement}` as RequirementCookieKey).set(true)
      }
    }
  }

  let _requirements: NonNullable<ComponentProps<Quest>['requirements']> = []
  if (requirements) {
    _requirements = Object.entries(requirements).reduce(
      (prev, cur) => {
        prev = [
          ...prev,
          {
            // @ts-ignore
            text: $i18n.t(`quests:${id}.requirements.${cur[0]}`),
            complete: cur[1]
          }
        ]
        return prev
      },
      [] as NonNullable<ComponentProps<Quest>['requirements']>
    )
  }

  let nextDisabled = false

  $: _steps = steps.map((step) => {
    if (step.type === 'requirements') {
      return {
        type: 'regular',
        id: 'requirements'
      }
    }

    if (step.type === 'claimRewards') {
      return {
        type: 'jetty',
        id: 'claimRewards',
        component: ClaimRewards,
        props: {
          questId: id,
          onNext: () => actions.next(),
          onBack: () => actions.back(),
          text: $quests[id].text['claim.md']
        }
      }
    }

    if (step.type === 'complete') {
      return {
        type: 'jetty',
        id: 'complete',
        component: CompleteQuest,
        props: {
          onBack: () => actions.back(),
          completeQuest: _completeQuest,
          text: $quests[id].text['complete.md']
        }
      }
    }

    return step
  }) as (RegularStep | JettyStep<any>)[]
</script>

<Quest
  bind:this={quest}
  bind:render
  on:close={closeQuest}
  on:complete={_completeQuest}
  on:progressUpdated={progressUpdated}
  title={$i18n.t(`quests:${id}.title`)}
  description={$i18n.t(`quests:${id}.introDescription`)}
  minutesToComplete={$quests[id].minutesToComplete}
  rewards={$quests[id].rewards}
  steps={_steps}
  requirements={_requirements}
  {nextDisabled}
  jettyRenderer={jettyDialog}
  let:back
  let:next
  let:render
  let:lastProgress
  let:progress
>
  <slot {back} {next} {render} completeQuest={_completeQuest} />

  {#if render('requirements')}
    <VerifyRequirements
      questId={id}
      {requirements}
      on:all-requirements-met={() => {
        nextDisabled = false
        if (lastProgress < progress) next()
      }}
      on:requirements-not-met={() => {
        nextDisabled = true
      }}
    />
  {/if}
</Quest>
