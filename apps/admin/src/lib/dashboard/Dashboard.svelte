<script lang="ts">
  import { apiCall } from '$lib/api/api-call'
  import Card from '$lib/widgets/Card.svelte'
  import { Button } from 'flowbite-svelte'
  let value = '{}'
</script>

<div class="mt-px space-y-4">
  <Card title="Populate RadMorph image URLs">
    <input type="text" bind:value />
    <Button
      on:click={async () => {
        const body = JSON.parse(value)

        console.log(await apiCall().post('api/radmorph/upload-json', body))
      }}>Send</Button
    >
  </Card>
</div>
