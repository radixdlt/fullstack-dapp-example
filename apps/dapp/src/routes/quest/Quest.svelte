<script lang="ts">
  import { page } from '$app/stores'
  import { questApi } from '$lib/api/quest-api'
  import Quest from '$lib/components/quest/Quest.svelte'
  import { onMount, type ComponentProps } from 'svelte'
  import { closeQuest } from './+layout.svelte'
  import { user } from '../../stores'

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
    back: () => {}
  }

  const saveProgress = (progress: number) => {
    localStorage.setItem(`savedProgress`, JSON.stringify({ questId: id, progress }))
    if ($user) questApi.saveProgress(id, progress)
  }

  let quest: Quest

  onMount(() => {
    actions.next = quest.next
    actions.back = quest.back
  })
</script>

<Quest
  bind:this={quest}
  on:close={closeQuest}
  on:complete={closeQuest}
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
  <slot {back} {next} {render} />

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
  />
</Quest>
