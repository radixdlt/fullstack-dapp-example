<script lang="ts">
  import { Heading } from 'flowbite-svelte'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import { TableHeadCell } from 'flowbite-svelte'

  import Delete from './Delete.svelte'
  import type { PageData } from './$types'
  import { publicConfig } from '$lib/public-config'
  import { GatewayApi } from 'common'

  let openDelete: boolean = false // modal control

  export let data: PageData

  const Users = data.users

  const gateway = GatewayApi(publicConfig.networkId)
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="p-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
      All Users
    </Heading>
  </div>
  <Table>
    <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
      {#each ['Id', 'Created', 'identity Address', 'Account address', 'Country'] as title}
        <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody>
      {#each Users as user}
        <TableBodyRow class="text-base">
          <TableBodyCell
            class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 cursor-pointer"
            on:click={() => {
              window.location.href = `/users/${user.id}`
            }}
          >
            <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
              <div class="text-base font-semibold text-gray-900 dark:text-white">
                {user.name ?? 'N/A'}
              </div>
              <div class="text-sm font-normal text-gray-500 dark:text-gray-400">{user.id}</div>
            </div>
          </TableBodyCell>
          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {user.createdAt}
          </TableBodyCell>
          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {user.identityAddress}
          </TableBodyCell>
          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-blue-500 dark:text-blue-500 xl:max-w-xs"
          >
            {#if user.accountAddress}
              <a
                target="_blank"
                href={`${gateway.networkConfig.dashboardUrl}/account/${user.accountAddress}`}
                >{user.accountAddress}</a
              >
            {/if}
          </TableBodyCell>
          <TableBodyCell class="p-4">{user.country}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</main>

<!-- Modals -->

<Delete bind:open={openDelete} on:click />
