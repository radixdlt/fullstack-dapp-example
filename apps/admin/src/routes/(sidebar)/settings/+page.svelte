<script lang="ts">
  import CardList from '$lib/settings/CardList.svelte'
  import { Heading, Toggle } from 'flowbite-svelte'

  import type { PageData } from './$types'

  export let data: PageData

  let values: Record<string, boolean> = {
    radMorphMintingEnabled: data.configMap.get('radMorphMintingEnabled') || false
  }

  let items = [
    {
      title: 'RadMorph minting',
      subtitle: 'Allow minting of RadMorphs',
      key: 'radMorphMintingEnabled'
    }
  ]
</script>

<main class="p-4">
  <div class="grid grid-cols-1 space-y-2 dark:bg-gray-900 xl:grid-cols-3 xl:gap-3.5">
    <div class="col-span-full xl:mb-0">
      <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
        Settings
      </Heading>
    </div>
    <div class="col-span-full space-y-4">
      <CardList title="System Preferences" subtitle="Global system settings" {items} let:item>
        <div class="flex items-center justify-between">
          <div class="flex flex-grow flex-col">
            <div class="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</div>
            <div class="text-base font-normal text-gray-500 dark:text-gray-400">
              {item.subtitle}
            </div>
          </div>
          <Toggle
            checked={values.radMorphMintingEnabled}
            on:change={async () => {
              values[item.key] = !values[item.key]
              await fetch('/settings', {
                method: 'PUT',
                body: JSON.stringify({ [item.key]: values[item.key] === true ? 'true' : 'false' })
              })
            }}
            classDiv="peer-focus:ring-0 me-0"
          />
        </div>
      </CardList>
    </div>
  </div>
</main>
