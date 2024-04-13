<script lang="ts">
  import { page } from '$app/stores'
  import { questApi } from '$lib/api/quest-api'
  import Quest from '$lib/components/quest/Quest.svelte'
  import { onMount, type ComponentProps } from 'svelte'
  import { closeQuest } from './+layout.svelte'
  import { questRequirements, user } from '../../stores'
  import { completeQuest, useLocalStorage } from '$lib/utils/local-storage'
  import ClaimRewards from './ClaimRewards.svelte'
  import VerifyRequirements from './VerifyRequirements.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import type { QuestId } from 'content'

  export let id: QuestId
  export let title: ComponentProps<Quest>['title']
  export let description: ComponentProps<Quest>['description']
  export let minutesToComplete: ComponentProps<Quest>['minutesToComplete']
  export let rewards: ComponentProps<Quest>['rewards']
  export let steps: ComponentProps<Quest>['steps']
  export let nextDisabled: ComponentProps<Quest>['nextDisabled'] = false
  export let jettyClaimHtml: string
  export let jettyCompleteHtml: string
  export let render: (id: string) => boolean = () => false

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
    completeQuest(id, !!$user)
    closeQuest()
  }

  const progressUpdated = (e: CustomEvent<number>) => {
    saveProgress(e.detail)

    if (e.detail !== steps.length - 1) return

    const contentRequirements = $questRequirements[id]
      .filter((requirement) => requirement.type === 'content')
      .map((req) => req.id)

    contentRequirements.forEach((req) => {
      if ($user) questApi.completeContentRequirement(id, req)
      $questRequirements[id] = $questRequirements[id].map((requirement) => {
        if (requirement.id === req) {
          return {
            ...requirement,
            complete: true
          }
        } else {
          return requirement
        }
      })
    })
  }
</script>

<Quest
  bind:this={quest}
  bind:render
  on:close={closeQuest}
  on:complete={_completeQuest}
  on:progressUpdated={progressUpdated}
  {title}
  {description}
  {minutesToComplete}
  {rewards}
  {steps}
  requirements={$questRequirements[id]}
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
