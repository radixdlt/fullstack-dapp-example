<script lang="ts">
  import { Heading, Button } from 'flowbite-svelte'

  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import type { User } from 'database'

  let userId = $page.params.userId

  let user = writable<User | undefined>()

  const fetchUser = () => {
    fetch(`/users/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        $user = res.user
      })
  }

  onMount(() => {
    fetchUser()
  })

  const setUserStatus = (status: string) => {
    fetch(`/users/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ status })
    }).then(() => fetchUser())
  }

  const setUserType = (type: 'ADMIN' | 'USER') => {
    fetch(`/users/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ type })
    }).then(() => fetchUser())
  }
</script>

{#if $user}
  <main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
    <div class="p-4">
      <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
        {userId}
      </Heading>
    </div>
    {#if $user.status === 'OK'}
      <Button color={'green'} on:click={() => setUserStatus('TEMPORARILY_BLOCKED')}>
        Temporarily Block
      </Button>
      <Button color={'green'} on:click={() => setUserStatus('PERMANENTLY_BLOCKED')}>
        Permanently Block
      </Button>
    {:else if $user.status === 'PERMANENTLY_BLOCKED'}
      <Button color={'green'} on:click={() => setUserStatus('TEMPORARILY_BLOCKED')}>
        Temporarily Block
      </Button>
      <Button color={'red'} on:click={() => setUserStatus('OK')}>Unblock User</Button>
    {:else if $user.status === 'TEMPORARILY_BLOCKED'}
      <Button color={'red'} on:click={() => setUserStatus('OK')}>Unblock User</Button>
      <Button color={'green'} on:click={() => setUserStatus('PERMANENTLY_BLOCKED')}>
        Permanently Block
      </Button>
    {/if}

    {#if $user.type === 'ADMIN'}
      <Button color={'blue'} on:click={() => setUserType('USER')}>Demote to User</Button>
    {:else if $user.type === 'USER'}
      <Button color={'yellow'} on:click={() => setUserType('ADMIN')}>Promote to Admin</Button>
    {/if}

    <div class="p-4">
      <pre class="text-white">{JSON.stringify($user, null, 2)}</pre>
    </div>
  </main>
{/if}
