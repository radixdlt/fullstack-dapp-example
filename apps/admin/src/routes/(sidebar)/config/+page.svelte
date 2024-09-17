<script lang="ts">
  import { Heading, Toggle } from 'flowbite-svelte'

  import type { PageData } from './$types'
  import { onMount } from 'svelte'
  import type { GetQueuesResponse } from '../queues/+server'

  export let data: PageData

  let values: Record<string, boolean> = {}

  let items = data.items

  const extendItem = {
    transactionStreamStatus: {
      title: 'Transaction Stream',
      subtitle: 'Enable or disable the transaction stream',
      transformResponse: (value: string) => value === 'Run',
      transformRequest: (value: boolean) => (value ? 'Run' : 'Stop')
    }
  } as const

  type ConfigKey = keyof typeof extendItem
  type ExtendedItem = { key: string; value: string } & (typeof extendItem)[keyof typeof extendItem]

  const extendedItems = items
    .filter((item) => item.key in extendItem)
    .map((item) => ({ ...item, ...extendItem[item.key as ConfigKey] }))
    .reduce<ExtendedItem[]>((acc, item) => [...acc, item], [])

  extendedItems.forEach((item) => (values[item.key] = item.transformResponse(item.value)))

  let queues: GetQueuesResponse['queues'] = []

  onMount(() => {
    fetch('/queues')
      .then((res) => res.json())
      .then((data: GetQueuesResponse) => {
        queues = data.queues
      })
  })
</script>

<main class="p-4">
  <div class="grid grid-cols-1 space-y-2 dark:bg-gray-900 xl:grid-cols-3 xl:gap-3.5">
    <div class="col-span-full xl:mb-0">
      <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
        Config
      </Heading>
    </div>
    <div class="col-span-full space-y-4">
      {#each extendedItems as item}
        <div class="flex items-center gap-10">
          <div class="flex flex-col">
            <div class="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</div>
            <div class="text-base font-normal text-gray-500 dark:text-gray-400">
              {item.subtitle}
            </div>
          </div>
          <Toggle
            checked={values[item.key]}
            on:change={async () => {
              const nextValue = !values[item.key]
              values[item.key] = nextValue
              await fetch('/config', {
                method: 'PUT',
                body: JSON.stringify({ [item.key]: item.transformRequest(nextValue) })
              })
            }}
            classDiv="peer-focus:ring-0 me-0"
          />
        </div>
      {/each}
    </div>

    {#each queues as queue}
      <div class="col-span-full space-y-4">
        <div class="flex gap-10">
          <div class="text-lg font-semibold text-gray-900 dark:text-white">{queue.name}</div>

          <Toggle
            checked={!queue.isPaused}
            on:change={async () => {
              const nextStatus = queue.isPaused ? false : true
              queue.isPaused = nextStatus
              await fetch(`/queues`, {
                method: 'PUT',
                body: JSON.stringify({ shouldPause: nextStatus, name: queue.name })
              })
            }}
            classDiv="peer-focus:ring-0 me-0"
          />
        </div>
        {#each Object.entries(queue.count) as [type, count]}
          <div class="text-base font-normal text-gray-500 dark:text-gray-400">
            {type}: {count}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</main>
