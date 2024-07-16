<script lang="ts">
  import { Button, Heading } from 'flowbite-svelte'

  const rehydrate = () =>
    fetch(`/scripts/rehydrate`, {
      method: 'POST'
    })
</script>

<Heading class="py-4 text-lg font-semibold text-gray-900 dark:text-white">Scripts</Heading>

<Button on:click={() => rehydrate()}>Rehydrate message queues</Button>
