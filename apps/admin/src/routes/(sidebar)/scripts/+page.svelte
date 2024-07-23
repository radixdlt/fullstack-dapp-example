<script lang="ts">
  import { Button, Heading } from 'flowbite-svelte'

  const rehydrate = () =>
    fetch(`/scripts/rehydrate`, {
      method: 'POST'
    })

  const lettySwap = () =>
    fetch(`/scripts/letty-swap`, {
      method: 'POST'
    })
</script>

<Heading class="p-4 text-lg font-semibold text-gray-900 dark:text-white">Scripts</Heading>
<div class="p-4">
  <Button class="block mb-5" on:click={() => rehydrate()}
    >Retry failed jobs in message queues</Button
  >

  <Button class="block" on:click={() => lettySwap()}>Update Letty swap dApp Definition</Button>
</div>
