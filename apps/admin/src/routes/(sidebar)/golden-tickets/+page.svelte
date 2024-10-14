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
    TableSearch,
    Spinner
  } from 'flowbite-svelte'
  import { invalidateAll } from '$app/navigation'
  import type { PageServerData } from './$types'
  import type { GoldenTicket } from 'database'
  import { slide } from 'svelte/transition'
  import Pagination from './Pagination.svelte'
  import { http } from '$lib/http'
  import { goldenTicketUtils } from 'common'

  export let data: PageServerData

  let showCreateBatch = false
  let showImportBatch = false
  let showSearchedTicket = false
  let showChangeExpiration = false
  let changeExpirationOnBatch: string
  let newExpirationDate: string

  let amountToIssue: string
  const ownerId = data.userId
  let expiresAt: Date
  let description: string

  let searchedTicketId: string
  let searchedTicket: GoldenTicket

  const setExpirationDate = async (batchId: string) => {
    await http.patch(`/golden-tickets/${batchId}`, {
      expiresAt: new Date(newExpirationDate)
    })

    invalidateAll()
  }

  const issueBatch = async () => {
    loading = true
    await http.post(`/golden-tickets/batch`, {
      amount: parseInt(amountToIssue),
      ownerId,
      expiresAt: new Date(expiresAt),
      description
    })
    loading = false

    showCreateBatch = false
    invalidateAll()
  }

  const importBatch = async () => {
    const tickets = goldenTicketUtils.csv.readRows(importedBatch[0])

    await http.post(`/golden-tickets/import`, {
      expiresAt: new Date(expiresAt),
      tickets: JSON.stringify(await tickets),
      ownerId,
      description
    })

    showImportBatch = false
    invalidateAll()
  }

  const downloadFiles = async (batchId: string) => {
    const tickets = await getTicketsForBatch(batchId)

    goldenTicketUtils.csv.writeRows(tickets, data.baseUrl)
    await goldenTicketUtils.csv.download()
    goldenTicketUtils.csv.clear()

    await goldenTicketUtils.qr.createZip(tickets, data.baseUrl)
  }

  let openRow: number | undefined

  const toggleRow = (i: number) => {
    currentPage = 0
    openRow = openRow === i ? undefined : i
  }

  let currentPage = 0
  const ticketsPerPage = 50

  let importedBatch: FileList

  const batchTickets: { [batchId: string]: GoldenTicket[] } = {}

  const getTicketsForBatch = async (batchId: string) => {
    if (!batchTickets[batchId]) {
      loading = true
      return new Promise<GoldenTicket[]>((resolve) => {
        http.get(`/golden-tickets/batch/${batchId}`).then((res) => {
          batchTickets[batchId] = res.tickets
          loading = false
          resolve(res.tickets)
        })
      })
    }

    return batchTickets[batchId] ?? []
  }

  let loading = false
</script>

<Modal title="Golden Ticket" bind:open={showSearchedTicket} autoclose>
  <div>
    <div>
      <span class="font-semibold">ID:</span>
      <span>{searchedTicket.id}</span>
    </div>
    <div>
      <span class="font-semibold">Claimed at:</span>
      <span>{searchedTicket.claimedAt?.toLocaleDateString() ?? 'unclaimed'}</span>
    </div>
    <div>
      <span class="font-semibold">Claimed invalid:</span>
      <span>{searchedTicket.status === 'CLAIMED_INVALID' ? 'yes' : 'no'}</span>
    </div>
    <div>
      <span class="font-semibold">Claimed by:</span>
      <span>{searchedTicket.userId ?? ''}</span>
    </div>
    <div>
      <span class="font-semibold">Batch</span>
      <span>{searchedTicket.batchId}</span>
    </div>
  </div>
</Modal>

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
      http.get(`/golden-tickets/${searchedTicketId}`).then((res) => {
        searchedTicket = res.ticket
        showSearchedTicket = true
      })
    }}
  >
    Search
  </Button>

  {#if loading}
    <Spinner class="ml-5" />
  {/if}

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
    {#each ['batch id', 'size', 'claimed', 'claimed invalid', 'created at', 'expires at', 'description', '', ''] as title}
      <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
    {/each}
  </TableHead>
  <TableBody>
    {#each data.batches as batch, i}
      <TableBodyRow
        class="text-base"
        on:click={() => {
          getTicketsForBatch(batch.id).then(() => {
            toggleRow(i)
          })
        }}
      >
        <TableBodyCell>{batch.id}</TableBodyCell>
        <TableBodyCell>{batch.ticketCount}</TableBodyCell>
        <TableBodyCell>{batch.claimedCount}</TableBodyCell>
        <TableBodyCell>{batch.claimedInvalidCount}</TableBodyCell>
        <TableBodyCell>{batch.createdAt.toLocaleDateString()}</TableBodyCell>
        <TableBodyCell>{batch.expiresAt.toLocaleDateString()}</TableBodyCell>
        <TableBodyCell>{batch.description}</TableBodyCell>
        <TableBodyCell>
          <Button
            on:click={(e) => {
              e.stopPropagation()
              changeExpirationOnBatch = batch.id
              showChangeExpiration = true
            }}>Change Expiration Date</Button
          >
        </TableBodyCell>
        <TableBodyCell>
          <Button
            on:click={(e) => {
              e.stopPropagation()
              downloadFiles(batch.id)
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
                  {#each ['id', 'claimed at', 'claimed invalid'] as title}
                    <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
                  {/each}
                </TableHead>
                {#each batchTickets[batch.id].slice(currentPage * ticketsPerPage, (currentPage + 1) * ticketsPerPage) as ticket}
                  <TableBodyRow class="text-base">
                    <TableBodyCell
                      class={`${searchedTicketId === ticket.id ? 't-red-500 dark:text-red-400' : 't-gray-500 dark:text-gray-400'}`}
                      >{ticket.id}</TableBodyCell
                    >
                    <TableBodyCell class="t-gray-500 dark:text-gray-400"
                      >{ticket.claimedAt ?? 'unclaimed'}</TableBodyCell
                    >
                    <TableBodyCell class="t-gray-500 dark:text-gray-400">
                      {ticket.status === 'CLAIMED_INVALID' ? 'yes' : 'no'}
                    </TableBodyCell>
                  </TableBodyRow>
                {/each}
              </Table>
              <Pagination
                {currentPage}
                totalPages={Math.ceil(batchTickets[batch.id].length / ticketsPerPage)}
                set={(val) => (currentPage = val)}
              />
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/if}
    {/each}
  </TableBody>
</Table>
