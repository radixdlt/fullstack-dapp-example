<script lang="ts">
  import { Button, Heading, TableHeadCell } from 'flowbite-svelte'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import type { PageData } from './$types'
  import { GatewayApi } from 'common'
  import { publicConfig } from '$lib/public-config'

  export let data: PageData
  const events = data.events

  const gateway = GatewayApi(publicConfig.networkId)

  const retryJob = (id: string) =>
    fetch(`/events`, {
      method: 'POST',
      body: JSON.stringify({ ids: [id] })
    })
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="p-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
      Events
    </Heading>
  </div>

  <Table>
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
  </Table>
</main>
