<script lang="ts">
  import Card from '../widgets/Card.svelte'

  export let title: string
  export let subtitle: string = ''

  // eslint-disable-next-line
  export let items: any[] = []
</script>

<Card {title} {...$$restProps}>
  {#if subtitle}
    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">{subtitle}</p>
  {/if}

  <ul class="divide-y divide-gray-200 dark:divide-gray-700">
    {#each items as item}
      <li class="py-4">
        <slot {item} />
      </li>
    {/each}
  </ul>
</Card>
