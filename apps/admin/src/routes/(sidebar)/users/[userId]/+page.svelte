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

  const blockUser = () => {
    fetch(`/users/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ block: !$user!.blocked })
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
    <Button color={'red'} on:click={() => blockUser()}>
      {$user.blocked ? 'Unblock user' : 'Block user'}
    </Button>

    <div class="p-4">
      <pre class="text-white">{JSON.stringify($user, null, 2)}</pre>
    </div>
  </main>
{/if}
