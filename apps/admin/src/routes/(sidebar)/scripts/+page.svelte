<script lang="ts">
  import { WorkerError } from 'common'
  import { Heading, Dropdown, Button, Checkbox } from 'flowbite-svelte'
  import { ChevronDownOutline } from 'flowbite-svelte-icons'

  const rehydrate = (errors?: WorkerError[]) =>
    fetch(`/scripts/rehydrate`, {
      method: 'POST',
      body: JSON.stringify({ errors })
    })

  const lettySwap = () =>
    fetch(`/scripts/letty-swap`, {
      method: 'POST'
    })

  const updateKycBadge = () =>
    fetch(`/scripts/kyc-badge`, {
      method: 'POST'
    })

  let checkedErrors: boolean[] = Array(Object.keys(WorkerError).length).fill(false)

  $: checkedErrorsMapping = Object.keys(WorkerError).filter(
    (_, i) => checkedErrors[i]
  ) as WorkerError[]
</script>

<Heading class="p-4 text-lg font-semibold text-gray-900 dark:text-white">Scripts</Heading>
<div class="p-4">
  <Button
    >Select errors to retry<ChevronDownOutline
      class="w-6 h-4 ms-2 text-white dark:text-white"
    /></Button
  >
  <Dropdown class="p-3 space-y-3 text-sm overflow-y-auto h-48">
    {#each Object.keys(WorkerError) as error, i}
      <Checkbox bind:checked={checkedErrors[i]}>{error}</Checkbox>
    {/each}
  </Dropdown>
  <Button class="block mb-5 mt-5 inline" on:click={() => rehydrate(checkedErrorsMapping)}
    >Retry failed jobs with errors in message queues</Button
  >

  <Button class="block mb-5" on:click={() => rehydrate()}
    >Retry all failed jobs in message queues</Button
  >

  <Button class="block mb-5" on:click={() => lettySwap()}>Update Letty swap dApp Definition</Button>

  <Button class="block" on:click={() => updateKycBadge()}>Update KYC badge address</Button>
</div>
