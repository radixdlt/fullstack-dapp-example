<script lang="ts">
  import { Heading } from 'flowbite-svelte'

  import type { PageData } from './$types'

  export let data: PageData

  const { id } = data.user
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="p-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
      {id}
    </Heading>
  </div>
  <div class="p-4">
    <pre class="text-white">{JSON.stringify(data.user, null, 2)}</pre>
  </div>
</main>
