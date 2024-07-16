<script lang="ts">
  import { Heading, Toggle } from 'flowbite-svelte'

  import type { PageData } from './$types'

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
</script>

<main class="p-4">
  <div class="grid grid-cols-1 space-y-2 dark:bg-gray-900 xl:grid-cols-3 xl:gap-3.5">
    <div class="col-span-full xl:mb-0">
      <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
        Settings
      </Heading>
    </div>
    <div class="col-span-full space-y-4">
      {#each extendedItems as item}
        <div class="flex items-center justify-between">
          <div class="flex flex-grow flex-col">
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
              await fetch('/settings', {
                method: 'PUT',
                body: JSON.stringify({ [item.key]: item.transformRequest(nextValue) })
              })
            }}
            classDiv="peer-focus:ring-0 me-0"
          />
        </div>
      {/each}
    </div>
  </div>
</main>
