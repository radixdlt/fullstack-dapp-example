<script lang="ts">
  import { http } from '$lib/http'
  import { Button } from 'flowbite-svelte'

  let status: 'loading' | 'error' | 'success' | undefined

  const populate = () => {
    status = 'loading'
    http
      .post('/images/populate-image-oracle', {})
      .then((res) => {
        status = 'success'
      })
      .catch(() => {
        status = 'error'
      })
  }
</script>

<Button on:click={populate} disabled={status === 'loading'}>Populate Image Oracle</Button>
{#if status === 'loading'}
  Loading...
{:else if status === 'success'}
  Success
{:else if status === 'error'}
  Error, please try again
{/if}
