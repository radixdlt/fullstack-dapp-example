<script lang="ts">
  import { Button, Checkbox, Heading, TableHeadCell, TableSearch } from 'flowbite-svelte'
  import { TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import { GatewayApi, type Event } from 'common'
  import { publicConfig } from '$lib/public-config'
  import { onMount } from 'svelte'

  let events: Event[] = []

  const gateway = GatewayApi(publicConfig.networkId)

  let mounted = false

  let filters = {
    status: {
      waiting: false,
      pending: false,
      error: true,
      completed: false,
      failed_retry: true,
      failed_permanent: false,
      paused: false,
      cancelled: false
    } as Record<string, boolean>,
    userId: ''
  }

  const getEvents = () => {
    fetch(`/events`, { method: 'POST', body: JSON.stringify(filters) })
      .then((res) => res.json())
      .then((res) => {
        events = res.data
      })
  }

  $: {
    if (mounted && filters) getEvents()
  }

  onMount(() => {
    mounted = true
    getEvents()
  })

  const retryJob = (id: string) =>
    fetch(`/events/retry`, {
      method: 'POST',
      body: JSON.stringify({ ids: [id] })
    })
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="p-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
      Events
    </Heading>

    <div class="flex gap-3 mt-4">
      <div class="text-gray-900 dark:text-white">Status:</div>
      {#each Array.from(Object.keys(filters.status)) as name}
        <Checkbox bind:checked={filters.status[name]}>{name}</Checkbox>
      {/each}
    </div>
  </div>

  <TableSearch placeholder="Find user by id" hoverable={true} bind:inputValue={filters.userId}>
    <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
      {#each ['eventId', 'userId', 'created', 'transactionId', 'status', 'Action'] as title}
        <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody>
      {#each events as event}
        <TableBodyRow class="text-base">
          <TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4"
            >{event.id}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            <a target="_blank" href={`/users/${event.userId}`}>{event.userId}</a></TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
            >{event.createdAt}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            <a
              target="_blank"
              href={`${gateway.networkConfig.dashboardUrl}/transaction/${event.transactionId}`}
              >{event.transactionId}</a
            >
          </TableBodyCell>
          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {event.status}
          </TableBodyCell>
          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
            ><Button on:click={() => retryJob(event.transactionId)}>Retry</Button></TableBodyCell
          >
        </TableBodyRow>
      {/each}
    </TableBody>
  </TableSearch>
</main>
