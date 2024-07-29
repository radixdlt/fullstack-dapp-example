<script lang="ts">
  import Card from '$lib/widgets/Card.svelte'
  import { http } from '$lib/http'
  import { Button, Heading, Select, TableHeadCell, Label } from 'flowbite-svelte'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte'
  import type { PageData } from './$types'

  export let data: PageData

  let filesToBeUploaded: Record<string, string> = {}
  let imageType: string

  const imageTypes = [
    {
      value: 'RadMorph',
      name: 'RadMorph'
    },
    {
      value: 'RadGem',
      name: 'RadGem'
    },
    {
      value: 'Card',
      name: 'Card'
    }
  ]

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

  const {
    RadMorph,
    RadGem,
    Card: EnergyCard
  } = data.images.reduce<{
    RadMorph: any[]
    RadGem: any[]
    Card: any[]
  }>(
    (acc, image) => {
      acc[image.type].push(image)
      return acc
    },
    { RadMorph: [], RadGem: [], Card: [] }
  )
</script>

<div class="mt-px space-y-4">
  <Card title="Upload Images">
    <div class="flex items-center">
      <input
        type="file"
        accept="application/JSON"
        on:change={(event) => handleFileUpload(event?.currentTarget?.files)}
      />
      <div>
        <Label for="imageType" class="mb-2">Image Type</Label>
        <Select id="imageType" items={imageTypes} bind:value={imageType} />
      </div>
    </div>

    <div>
      <Button
        class="my-5"
        disabled={!imageType}
        on:click={async () => {
          http.post('/images/upload-json', { data: filesToBeUploaded, imageType })
        }}>Set in DB</Button
      >
    </div>
    {#if Object.keys(filesToBeUploaded).length > 0}
      <Heading class="py-4 text-md font-semibold text-gray-900 dark:text-white">
        Images to be uploaded
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
              <TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
                {radmorphImage[0]}
              </TableBodyCell>
              <TableBodyCell
                class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
              >
                <a href={radmorphImage[1]} target="_blank">{radmorphImage[1]}</a>
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    {/if}
  </Card>
</div>

<main class="mt-10 relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="p-4 grid gap-4 align-center grid-cols-2">
    <div>
      <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
        Images
      </Heading>
      <div>
        <div class="text-white">
          RadMorphs: {RadMorph.length}
        </div>
        <div class="text-white">
          RadGems: {RadGem.length}
        </div>
        <div class="text-white">
          Cards: {EnergyCard.length}
        </div>
      </div>
    </div>
    <div>
      <Button
        on:click={async () => {
          http.post('/images/populate-image-oracle')
        }}>Populate image oracle</Button
      >
    </div>
  </div>
  <Table>
    <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
      {#each ['Id', 'Url', 'Type'] as title}
        <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody>
      {#each data.images as image}
        <TableBodyRow class="text-base">
          <TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4 cursor-pointer">
            {image.id}
          </TableBodyCell>
          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            <a href={image.url} target="_blank">{image.url}</a>
          </TableBodyCell>
          <TableBodyCell
            class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
          >
            <a href={image.url} target="_blank">{image.type}</a>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</main>
