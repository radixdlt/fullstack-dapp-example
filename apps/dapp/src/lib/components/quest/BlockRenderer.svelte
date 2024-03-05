<script lang="ts">
  import type { SvelteComponent } from 'svelte'

  export let block:
    | {
        name: string
        type: 'component'
      }
    | { type: 'html'; value: string }

  export let components: Record<
    string,
    { component: new (...args: any[]) => SvelteComponent; properties?: Record<string, unknown> }
  > = {}

  export let requirements: Record<string, boolean> = {}
</script>

{#if block.type === 'html'}
  {@html block.value}
{:else if block.type === 'component' && 'name' in block}
  {#if components?.[block.name]}
    {@const fill = components?.[block.name]}
    <svelte:component
      this={fill.component}
      {requirements}
      {...fill.properties}
      on:next
      on:prev
      on:nextDisable
      on:nextEnable
    ></svelte:component>
  {/if}
{/if}
