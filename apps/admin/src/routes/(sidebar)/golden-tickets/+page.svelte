<script lang="ts">
  import {
    Button,
    Heading,
    Input,
    Modal,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch
  } from 'flowbite-svelte'
  import { invalidateAll } from '$app/navigation'
  import type { PageServerData } from './$types'
  import type { GoldenTicket } from 'database'
  import { clear, download, readRows, writeRows } from './csv'
  import { createZip } from './qr-codes'
  import { slide } from 'svelte/transition'
  import Pagination from './Pagination.svelte'
  import { http } from '$lib/http'

  export let data: PageServerData

  $: batches = data.tickets.reduce(
    (acc, ticket) => {
      if (!acc[ticket.batchId]) {
        acc[ticket.batchId] = []
      }
      acc[ticket.batchId].push(ticket)
      return acc
    },
    {} as Record<string, GoldenTicket[]>
  )

  let showCreateBatch = false
  let showImportBatch = false
  let showChangeExpiration = false
  let changeExpirationOnBatch: string
  let newExpirationDate: string

  let amountToIssue: number
  const ownerId = data.userId
  let expiresAt: Date
  let description: string

  let searchedTicketId: string

  const setExpirationDate = async (batchId: string) => {
    await http.patch('/golden-tickets/', {
      batchId,
      expiresAt: new Date(newExpirationDate)
    })

    invalidateAll()
  }

  const issueBatch = async () => {
    await http.post(`/golden-tickets`, {
      amount: amountToIssue,
      ownerId,
      expiresAt: new Date(expiresAt),
      description
    })

    showCreateBatch = false
    invalidateAll()
  }

  const importBatch = async () => {
    const tickets = readRows(importedBatch[0])

    await http.post(`/golden-tickets/import`, {
      expiresAt: new Date(expiresAt),
      tickets: JSON.stringify(await tickets),
      ownerId,
      description
    })

    showImportBatch = false
    invalidateAll()
  }

  const downloadFiles = async (tickets: GoldenTicket[]) => {
    writeRows(tickets, data.baseUrl)
    await download()
    clear()

    await createZip(tickets, data.baseUrl)
  }

  let openRow: number | undefined

  const toggleRow = (i: number) => {
    currentPage = 0
    openRow = openRow === i ? undefined : i
  }

  let currentPage = 0
  const ticketsPerPage = 50

  let importedBatch: FileList
</script>

<Modal title="Issue Batch" bind:open={showCreateBatch} autoclose>
  <div>
    Number of tickets<Input label="Number of tickets" type="number" bind:value={amountToIssue} />
  </div>
  <div>
    Expires at<Input label="Expires at" type="date" bind:value={expiresAt} />
  </div>
  <div>
    Description<Input label="Description" bind:value={description} />
  </div>
  <Button on:click={issueBatch}>Issue</Button>
</Modal>

<Modal title="Import Batch" bind:open={showImportBatch} autoclose>
  <input type="file" accept=".csv" bind:files={importedBatch} />
  <div>
    Expires at<Input label="Expires at" type="date" bind:value={expiresAt} />
  </div>
  <div>
    Description<Input label="Description" bind:value={description} />
  </div>

  <Button on:click={importBatch}>Import</Button>
</Modal>

<Modal title="Change Expiration Date" bind:open={showChangeExpiration} autoclose>
  <div>
    Expires at<Input label="Expires at" type="date" bind:value={newExpirationDate} />
  </div>
  <Button on:click={() => setExpirationDate(changeExpirationOnBatch)}>Change</Button>
</Modal>

<Heading class="py-4 pl-5 text-lg font-semibold text-gray-900 dark:text-white">
  Golden Tickets
</Heading>
<div class="flex items-center">
  <TableSearch
    placeholder="Find ticket by id"
    hoverable={true}
    bind:inputValue={searchedTicketId}
  />
  <Button
    class="mt-1"
    on:click={() => {
      const batchId = Object.keys(batches).find((batchId) =>
        batches[batchId].some((ticket) => ticket.id === searchedTicketId)
      )
      if (batchId) {
        toggleRow(Object.keys(batches).indexOf(batchId))
        currentPage = Math.floor(
          batches[batchId].findIndex((ticket) => ticket.id === searchedTicketId) / ticketsPerPage
        )
      }
    }}>Search</Button
  >

  <div class="ml-auto mr-10 flex gap-5">
    <Button on:click={() => (showCreateBatch = true)}>Issue New Batch</Button>
    <Button on:click={() => (showImportBatch = true)}>Import Batch</Button>
    <Button
      on:click={() => {
        invalidateAll()
      }}>Refresh</Button
    >
  </div>
</div>

<Table>
  <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
    {#each ['batch id', 'size', 'claimed', 'claimed invalid', 'expired', 'created at', 'expires at', 'description', '', ''] as title}
      <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
    {/each}
  </TableHead>
  <TableBody>
    {#each Object.entries(batches) as batch, i}
      {@const [batchId, tickets] = batch}

      <TableBodyRow class="text-base" on:click={() => toggleRow(i)}>
        <TableBodyCell>{batchId}</TableBodyCell>
        <TableBodyCell>{tickets.length}</TableBodyCell>
        <TableBodyCell>{tickets.filter((t) => t.status === 'CLAIMED').length}</TableBodyCell>
        <TableBodyCell>{tickets.filter((t) => t.status === 'CLAIMED_INVALID').length}</TableBodyCell
        >
        <TableBodyCell
          >{tickets.filter(
            (t) => !t.claimedAt && new Date(t.expiresAt).getTime() < new Date().getTime()
          ).length}</TableBodyCell
        >
        <TableBodyCell>{tickets[0].createdAt.toLocaleDateString()}</TableBodyCell>
        <TableBodyCell>{tickets[0].expiresAt.toLocaleDateString()}</TableBodyCell>
        <TableBodyCell>{tickets[0].description}</TableBodyCell>
        <TableBodyCell>
          <Button
            on:click={(e) => {
              e.stopPropagation()
              changeExpirationOnBatch = batchId
              showChangeExpiration = true
            }}>Change Expiration Date</Button
          >
        </TableBodyCell>
        <TableBodyCell>
          <Button
            on:click={(e) => {
              e.stopPropagation()
              downloadFiles(tickets)
            }}>Download Files</Button
          >
        </TableBodyCell>
      </TableBodyRow>
      {#if openRow === i}
        <TableBodyRow>
          <TableBodyCell colspan="7" class="p-0">
            <div class="px-2 py-3 pl-20" transition:slide={{ duration: 300, axis: 'y' }}>
              <Table>
                <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
                  {#each ['id', 'claimed at', 'claimed invalid', 'owner'] as title}
                    <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
                  {/each}
                </TableHead>
                {#each tickets.slice(currentPage * ticketsPerPage, (currentPage + 1) * ticketsPerPage) as ticket}
                  <TableBodyRow class="text-base">
                    <TableBodyCell
                      class={`${searchedTicketId === ticket.id ? 't-red-500 dark:text-red-400' : 't-gray-500 dark:text-gray-400'}`}
                      >{ticket.id}</TableBodyCell
                    >
                    <TableBodyCell class="t-gray-500 dark:text-gray-400"
                      >{ticket.claimedAt?.toLocaleDateString() ?? 'unclaimed'}</TableBodyCell
                    >
                    <TableBodyCell class="t-gray-500 dark:text-gray-400">
                      {ticket.status === 'CLAIMED_INVALID' ? 'yes' : 'no'}
                    </TableBodyCell>
                    <TableBodyCell class="t-gray-500 dark:text-gray-400"
                      >{ticket.ownerId}</TableBodyCell
                    >
                  </TableBodyRow>
                {/each}
                <Pagination
                  {currentPage}
                  totalPages={Math.ceil(tickets.length / ticketsPerPage)}
                  set={(val) => (currentPage = val)}
                />
              </Table>
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/if}
    {/each}
  </TableBody>
</Table>
