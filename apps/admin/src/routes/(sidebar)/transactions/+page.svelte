<script lang="ts">
  import { Button, Heading, TableHeadCell } from 'flowbite-svelte'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import type { PageData } from './$types'
  import { GatewayApi } from 'common'
  import { publicConfig } from '$lib/public-config'

  export let data: PageData

  const transactions = data.transactions

  const gateway = GatewayApi(publicConfig.networkId)

  const retryJob = (id: string) =>
    fetch(`/transactions`, {
      method: 'POST',
      body: JSON.stringify({ ids: [id] })
    })
</script>

<Heading class="py-4 text-lg font-semibold text-gray-900 dark:text-white">Events</Heading>
<Table>
  <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
    {#each ['discriminator', 'userId', 'created', 'transactions', 'Status', 'Actions'] as title}
      <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
    {/each}
  </TableHead>
  <TableBody>
    {#each transactions as transaction}
      <TableBodyRow class="text-base">
        <TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
          {transaction.discriminator}</TableBodyCell
        >

        <TableBodyCell
          class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          ><a target="_blank" href={`/users/${transaction.userId}`}>{transaction.userId}</a
          ></TableBodyCell
        >

        <TableBodyCell
          class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >{transaction.createdAt}</TableBodyCell
        >

        <TableBodyCell
          class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
        >
          {#each transaction.transactions as submittedTransaction}
            <div>
              <a
                target="_blank"
                href={`${gateway.networkConfig.dashboardUrl}/transaction/${submittedTransaction.transactionId}`}
                >{submittedTransaction.transactionId}</a
              >
              <div>{submittedTransaction.status}</div>
            </div>
          {/each}
        </TableBodyCell>

        <TableBodyCell
          class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >{transaction.status}</TableBodyCell
        >

        <TableBodyCell
          class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          ><Button on:click={() => retryJob(transaction.discriminator)}>Retry</Button
          ></TableBodyCell
        >
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
