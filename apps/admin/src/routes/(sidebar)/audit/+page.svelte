<script lang="ts">
  import { Heading, TableHeadCell, TableSearch } from 'flowbite-svelte'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import { GatewayApi } from 'common'
  import { publicConfig } from '$lib/public-config'
  import { onMount } from 'svelte'
  import type { Audit } from 'database'

  let data: Audit[] = []

  const gateway = GatewayApi(publicConfig.networkId)

  let mounted = false

  let filters = {
    status: {
      completed: true,
      error: true,
      waiting: true,
      pending: true
    },
    userId: ''
  }

  const getEvents = () => {
    fetch(`/audit`, { method: 'POST', body: JSON.stringify(filters) })
      .then((res) => res.json())
      .then((res) => {
        data = res.data
      })
  }

  $: {
    if (mounted && filters) getEvents()
  }

  onMount(() => {
    mounted = true
    getEvents()
  })

  const getIterable = (data: unknown, key: string) => {
    if (data && typeof data === 'object' && key in data) {
      if (Array.isArray((data as any)[key])) {
        return (data as any)[key]
      } else {
        return []
      }
    } else {
      return []
    }
  }
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="p-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
      Audit
    </Heading>
    <TableSearch placeholder="Find user by id" hoverable={true} bind:inputValue={filters.userId}
    ></TableSearch>
  </div>

  <Table>
    <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
      {#each ['userId', 'transactionId', 'type', 'data', 'USD value', 'xrd price'] as title}
        <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody>
      {#each data as event}
        <TableBodyRow class="text-base">
          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            <a target="_blank" href={`/users/${event.userId}`}>{event.userId}</a></TableBodyCell
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
            {event.type}
          </TableBodyCell>

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            <div>
              {#each getIterable(event?.data, 'fungible') as item}
                <div>{item.name}: {item.amount}</div>
              {/each}
              {#each getIterable(event?.data, 'nonFungible') as item}
                <div>{item.name}</div>
              {/each}
            </div>
          </TableBodyCell>

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {event.xrdUsdValue}
          </TableBodyCell>

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {event.xrdPrice}
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</main>
