<script lang="ts">
  import ExternalLink from '$lib/components/externalLink/ExternalLink.svelte'
  export let href = ''
  export let target = '_blank'
  let hover = false
</script>

<a on:mouseenter={() => (hover = true)} on:mouseleave={() => (hover = false)} {target} {href}>
  <slot />
  <ExternalLink --fill={hover ? 'var(--color-primary)' : 'var(--color-background-dark)'} />
</a>

<style lang="scss">
  a {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: var(--text-md);
    &:hover {
      color: var(--color-primary);
    }
  }
</style>
