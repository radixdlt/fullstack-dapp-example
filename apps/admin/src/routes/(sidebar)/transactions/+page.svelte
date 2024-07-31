<script lang="ts">
  import { Button, Checkbox, Heading, TableHeadCell, TableSearch } from 'flowbite-svelte'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import { GatewayApi } from 'common'
  import type { TransactionIntent, SubmittedTransaction } from 'database'
  import { publicConfig } from '$lib/public-config'
  import { onMount } from 'svelte'

  let transactions: (TransactionIntent & { transactions: SubmittedTransaction[] })[] = []

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

  const getTransactions = () => {
    fetch(`/transactions`, { method: 'POST', body: JSON.stringify(filters) })
      .then((res) => res.json())
      .then((res) => {
        transactions = res.data
      })
  }

  $: {
    if (mounted && filters) getTransactions()
  }

  onMount(() => {
    mounted = true
    getTransactions()
  })

  const gateway = GatewayApi(publicConfig.networkId)

  const retryJob = (id: string) =>
    fetch(`/transactions/retry`, {
      method: 'POST',
      body: JSON.stringify({ ids: [id] })
    })

  const retryAll = () => {
    fetch(`/transactions/retry`, {
      method: 'POST',
      body: JSON.stringify({ all: true })
    })
  }
</script>

<Heading class="py-4 pl-5 text-lg font-semibold text-gray-900 dark:text-white">Transactions</Heading
>
<div class="flex items-center gap-5">
  <TableSearch placeholder="Find user by id" hoverable={true} bind:inputValue={filters.userId} />

  <div class="text-gray-900 dark:text-white">Status:</div>
  <Checkbox bind:checked={filters.status.completed}>Completed</Checkbox>
  <Checkbox bind:checked={filters.status.error}>Error</Checkbox>
  <Checkbox bind:checked={filters.status.pending}>Pending</Checkbox>
  <Checkbox bind:checked={filters.status.waiting}>Waiting</Checkbox>
  <div class="ml-auto mr-10 flex gap-5">
    <Button color="red" on:click={retryAll}>Retry All</Button><Button on:click={getTransactions}
      >Refresh</Button
    >
  </div>
</div>

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
