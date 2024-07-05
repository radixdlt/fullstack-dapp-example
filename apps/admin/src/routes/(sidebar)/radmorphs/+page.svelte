<script lang="ts">
  import Card from '$lib/widgets/Card.svelte'
  import { Button, Heading, TableHeadCell } from 'flowbite-svelte'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import type { PageData } from './$types'

  export let data: PageData

  const radmorphImages = data.radMorphImages

  let filesToBeUploaded: Record<string, string> = {}

  const handleFileUpload = async (files: FileList | null) => {
    const file = files ? files[0] : undefined
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const text = e.target?.result

        if (!text) {
          return
        }

        filesToBeUploaded = JSON.parse(text as string)
      }
      reader.readAsText(file)
    }
  }
</script>

<div class="mt-px space-y-4">
  <Card title="Upload RadMorph images">
    <input
      type="file"
      accept="application/JSON"
      on:change={(event) => handleFileUpload(event?.currentTarget?.files)}
    />
    <div>
      <Button
        class="my-5"
        on:click={async () => {
          fetch('/radmorphs/upload-json', {
            method: 'POST',
            body: JSON.stringify(filesToBeUploaded),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }}>Set in DB</Button
      >

      <Button
        on:click={async () => {
          fetch('/radmorphs/populate-image-oracle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }}>Populate image oracle</Button
      >
    </div>
    {#if Object.keys(filesToBeUploaded).length > 0}
      <Heading class="py-4 text-md font-semibold text-gray-900 dark:text-white">
        RadMorph Images to be uploaded
      </Heading>
      <Table>
        <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
          {#each ['Id', 'Url'] as title}
            <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
          {/each}
        </TableHead>
        <TableBody>
          {#each Object.entries(filesToBeUploaded) as radmorphImage}
            <TableBodyRow class="text-base">
              <TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
                {radmorphImage[0]}
              </TableBodyCell>
              <TableBodyCell
                class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
              >
                <a href={radmorphImage[1]} target="_blank">radmorphImage[1]</a>
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    {/if}
  </Card>
</div>

<main class="mt-10 relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="p-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
      RadMorph Images
    </Heading>
  </div>
  <Table>
    <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
      {#each ['Id', 'Url'] as title}
        <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody>
      {#each radmorphImages as radmorphImage}
        <TableBodyRow class="text-base">
          <TableBodyCell
            class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 cursor-pointer"
          >
            {radmorphImage.id}
          </TableBodyCell>
          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            <a href={radmorphImage.url} target="_blank">{radmorphImage.url}</a>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</main>
