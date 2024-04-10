<script lang="ts">
  import { page } from '$app/stores'
  import { questApi } from '$lib/api/quest-api'
  import Quest from '$lib/components/quest/Quest.svelte'
  import { onMount, type ComponentProps } from 'svelte'
  import { closeQuest } from './+layout.svelte'
  import { user } from '../../stores'
  import { completeQuest, useLocalStorage } from '$lib/utils/local-storage'
  import ClaimRewards from './ClaimRewards.svelte'
  import VerifyRequirements from './VerifyRequirements.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import type { QuestId, Requirement } from 'content'

  export let id: QuestId
  export let title: ComponentProps<Quest>['title']
  export let description: ComponentProps<Quest>['description']
  export let minutesToComplete: ComponentProps<Quest>['minutesToComplete']
  export let rewards: ComponentProps<Quest>['rewards']
  export let steps: ComponentProps<Quest>['steps']
  export let requirements: {
    id: QuestId
    text: string
    complete: boolean
    type: Requirement['type']
  }[] = []
  export let nextDisabled: ComponentProps<Quest>['nextDisabled'] = false
  export let jettyClaimHtml: string
  export let jettyCompleteHtml: string

  export const actions = {
    next: () => {},
    back: () => {},
    goToStep: (_id: string) => {}
  }

  const saveProgress = (progress: number) => {
    useLocalStorage('savedProgress').set({ questId: id, progress })
    if ($user) questApi.saveProgress(id, progress)
  }

  let quest: Quest

  onMount(() => {
    actions.next = quest.next
    actions.back = quest.back
    actions.goToStep = quest.goToStep
  })

  const _completeQuest = () => {
    requirements.forEach(({ id: requirementId, type }) => {
      if (type === 'content') {
        questApi.completeContentRequirement(id, requirementId)
      }
    })
    completeQuest(id, !!$user)
    closeQuest()
  }
</script>

<Quest
  bind:this={quest}
  on:close={closeQuest}
  on:complete={_completeQuest}
  on:progressUpdated={(e) => saveProgress(e.detail)}
  {title}
  {description}
  {minutesToComplete}
  {rewards}
  {steps}
  {requirements}
  {nextDisabled}
  startAtProgress={$page.url.hash ? parseInt($page.url.hash.slice(1)) : 0}
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
        {@html jettyClaimHtml}
      </ClaimRewards>
    {/if}

    {#if render('complete')}
      {@html jettyCompleteHtml}

      <Button on:click={_completeQuest}>{$i18n.t('quests:completeQuest')}</Button>
    {/if}
  </svelte:fragment>

  {#if render('requirements')}
    <VerifyRequirements
      questId={id}
      on:all-requirements-met={lastProgress < progress ? next : back}
    />
  {/if}
</Quest>
