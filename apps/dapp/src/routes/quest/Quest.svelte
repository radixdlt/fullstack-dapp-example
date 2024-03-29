<script lang="ts">
  import { page } from '$app/stores'
  import { questApi } from '$lib/api/quest-api'
  import Quest from '$lib/components/quest/Quest.svelte'
  import { onMount, type ComponentProps } from 'svelte'
  import { closeQuest } from './+layout.svelte'
  import { user } from '../../stores'
  import { completeQuest, useLocalStorage } from '$lib/utils/local-storage'

  export let id: ComponentProps<Quest>['id']
  export let title: ComponentProps<Quest>['title']
  export let description: ComponentProps<Quest>['description']
  export let minutesToComplete: ComponentProps<Quest>['minutesToComplete']
  export let rewards: ComponentProps<Quest>['rewards']
  export let steps: ComponentProps<Quest>['steps']
  export let requirements: ComponentProps<Quest>['requirements'] = []
  export let nextDisabled: ComponentProps<Quest>['nextDisabled'] = false

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
</script>

<Quest
  bind:this={quest}
  on:close={closeQuest}
  on:complete={_completeQuest}
  on:progressUpdated={(e) => saveProgress(e.detail)}
  {id}
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
>
  <slot {back} {next} {render} completeQuest={_completeQuest} />

  <slot
    name="jetty"
    slot="jetty"
    let:render
    let:dialog
    let:Button
    let:Buttons
    let:next
    let:back
    {render}
    {dialog}
    {Button}
    {Buttons}
    {next}
    {back}
    completeQuest={_completeQuest}
  />
</Quest>
