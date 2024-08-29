<script lang="ts">
  import { Select, TableHeadCell, TableSearch } from 'flowbite-svelte'
  import { TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import { http } from '$lib/http'
  import { type CountryStatus, type BlockedCountry } from 'database'
  import type { LayoutData } from './$types'
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'

  export let data: LayoutData

  let countryFilter = ''

  const setCountryStatus = (country: BlockedCountry) => {
    http.put('/countries/api', country)
  }

  const filter = (countries: BlockedCountry[], filter: string) => {
    if (!filter) return countries

    return countries.filter((country) => {
      const lowerCasedFilter = filter.toLowerCase()
      return (
        country.country.toLowerCase().includes(lowerCasedFilter) ||
        country.countryCode.toLowerCase().includes(lowerCasedFilter)
      )
    })
  }

  const countryStatusList: { value: CountryStatus; name: string }[] = [
    { value: 'ALLOWED', name: 'Allowed' },
    { value: 'BLOCKED', name: 'Blocked' },
    { value: 'SANCTIONED', name: 'Sanctioned' }
  ]

  const sortKey = writable('blocked')
  const sortDirection = writable(1)
  const sortItems = writable(data.countries)

  const sortTable = (key: string) => {
    if ($sortKey === key) {
      sortDirection.update((val) => -val)
    } else {
      sortKey.set(key)
      sortDirection.set(1)
    }

    const direction = $sortDirection
    const sorted = [...$sortItems].sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]
      if (aVal < bVal) {
        return -direction
      } else if (aVal > bVal) {
        return direction
      }
      return 0
    })
    sortItems.set(sorted)
  }

  onMount(() => {
    sortTable('status')
  })
</script>

<TableSearch placeholder="Find country" bind:inputValue={countryFilter}>
  <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
    <TableHeadCell on:click={() => sortTable('country')} class="p-4 font-medium">Name</TableHeadCell
    >
    <TableHeadCell on:click={() => sortTable('countryCode')} class="p-4 font-medium"
      >Code</TableHeadCell
    >
    <TableHeadCell on:click={() => sortTable('blocked')} class="p-4 font-medium"
      >Status</TableHeadCell
    >
  </TableHead>
  <TableBody>
    {#each filter($sortItems, countryFilter) as country}
      <TableBodyRow class="text-base">
        <TableBodyCell>
          {country.country}</TableBodyCell
        >

        <TableBodyCell>
          {country.countryCode}</TableBodyCell
        >

        <TableBodyCell>
          <Select
            items={countryStatusList}
            bind:value={country.status}
            on:change={() => setCountryStatus(country)}
          />
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
