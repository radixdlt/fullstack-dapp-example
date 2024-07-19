<script lang="ts">
  import { Button, Heading, TableHeadCell, TableSearch } from 'flowbite-svelte'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import { writable } from 'svelte/store'
  import type { Marketing } from 'database'
  import { onMount } from 'svelte'

  let searchTerm = ''

  let items = writable<(Marketing & { user: { createdAt: string; country: string } })[]>([])
  let mounted = false

  $: {
    if (mounted) fetchEvents(searchTerm)
  }

  const fetchEvents = async (query: string) => {
    fetch('/marketing', { method: 'POST', body: JSON.stringify({ searchTerm: query }) })
      .then((res) => res.json())
      .then((data) => {
        $items = data.items
      })
  }

  const download = async (query: string) => {
    fetch('/marketing/download', { method: 'POST', body: JSON.stringify({ searchTerm: query }) })
      .then((res) => res.json())
      .then(({ items }) => {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(
          new Blob([JSON.stringify(items, null, 2)], {
            type: 'text/plain'
          })
        )
        a.setAttribute('download', `radquest_marketing ${new Date().toDateString()}`)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
  }

  onMount(() => {
    mounted = true
    fetchEvents(searchTerm)
  })
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="p-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
      Marketing
    </Heading>
    <div class="flex">
      <TableSearch placeholder="Search" hoverable={true} bind:inputValue={searchTerm}></TableSearch>
      <Button class="mt-4 self-center" on:click={() => download(searchTerm)}>Download</Button>
    </div>
  </div>
  <div class="text-white p-4">Showing 250 items</div>
  <Table>
    <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
      {#each ['user Id', 'utm_campaign', 'utm_medium', 'utm_source', 'utm_id', 'utm_content', 'utm_term', 'country', 'created At'] as title}
        <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody>
      {#each $items as item}
        <TableBodyRow class="text-base">
          <TableBodyCell
            class="flex items-center space-x-6 whitespace-nowrap p-4 cursor-pointer"
            on:click={() => {
              window.location.href = `/users/${item.userId}`
            }}>{item.userId}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {item.utm_campaign}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {item.utm_medium}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {item.utm_source}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {item.utm_id}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {item.utm_content}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {item.utm_term}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {item.user.country}</TableBodyCell
          >

          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            {item.user.createdAt}</TableBodyCell
          >
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</main>
