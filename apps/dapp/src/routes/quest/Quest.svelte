<script lang="ts">
  import { page } from '$app/stores'
  import { questApi } from '$lib/api/quest-api'
  import Quest from '$lib/components/quest/Quest.svelte'
  import { onMount, type ComponentProps } from 'svelte'
  import { closeQuest } from './+layout.svelte'
  import { quests, user } from '../../stores'
  import ClaimRewards from './ClaimRewards.svelte'
  import VerifyRequirements from './VerifyRequirements.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import type { QuestId } from 'content'
  import { useCookies } from '$lib/utils/cookies'
  import { completeQuest } from '$lib/utils/complete-quest'
  import JettyActionButtons from '$lib/components/quest/JettyActionButtons.svelte'
  import { useLocalStorage } from '$lib/utils/local-storage'

  export let id: QuestId
  export let steps: ComponentProps<Quest>['steps']
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

  let startAtProgress = 0

  if ($page.url.hash) {
    startAtProgress = parseInt($page.url.hash.slice(1))
  } else {
    const savedProgress = useCookies(`saved-progress-${id}`).get()
    if (savedProgress) {
      startAtProgress = parseInt(savedProgress)
    }
  }

  onMount(() => {
    actions.next = quest.next
    actions.back = quest.back
    actions.goToStep = quest.goToStep
  })

  const _completeQuest = async () => {
    await completeQuest(id, !!$user)
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
        // @ts-ignore
        useCookies(`requirement-${id}-${contentRequirement}`).set(true)
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
</script>

<Quest
  bind:this={quest}
  bind:render
  on:close={closeQuest}
  on:complete={_completeQuest}
  on:progressUpdated={progressUpdated}
  title={$i18n.t(`${id}.title`, { ns: 'quests' })}
  description={$i18n.t(`${id}.introDescription`, { ns: 'quests' })}
  minutesToComplete={$quests[id].minutesToComplete}
  rewards={$quests[id].rewards}
  {steps}
  requirements={_requirements}
  {nextDisabled}
  {startAtProgress}
  let:back
  let:next
  let:render
  let:lastProgress
  let:progress
>
  <slot {back} {next} {render} completeQuest={_completeQuest} />

  <svelte:fragment slot="jetty" let:render let:dialog let:Button let:Buttons let:next let:back>
    <slot
      name="jetty"
      {render}
      {dialog}
      {Button}
      {Buttons}
      {next}
      {back}
      completeQuest={_completeQuest}
    />
    {#if render('claimRewards')}
      <ClaimRewards questId={id} on:next={next}>
        {@html $quests[id].text['claim.md']}

        <svelte:fragment slot="buttons" let:loading let:handleClaimRewards>
          <JettyActionButtons
            nextText={$i18n.t('quests:claimButton')}
            {loading}
            on:back={back}
            on:next={handleClaimRewards}
          />
        </svelte:fragment>
      </ClaimRewards>
    {:else if render('complete')}
      {@html $quests[id].text['complete.md']}

      <JettyActionButtons
        nextText={$i18n.t('quests:completeQuest')}
        on:back={back}
        on:next={_completeQuest}
      />
    {:else}
      <JettyActionButtons on:back={back} on:next={next} />
    {/if}
  </svelte:fragment>

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
