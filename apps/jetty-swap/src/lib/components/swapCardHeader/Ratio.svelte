<script lang="ts">
  import Icon from '../icon/Icon.svelte'

  export let conversionRateTo: string
  export let conversionRateFrom: string
  export let clamResourceIcon: string | undefined
  export let ottercoinResourceIcon: string | undefined
</script>

<div class="ratio row">
  <span class="row">
    {conversionRateFrom ?? 'N/A'}
    <Icon --size="18px" url={clamResourceIcon} />
  </span>
  =
  <span class="row">
    {conversionRateTo ?? 'N/A'}
    <Icon --size="18px" url={ottercoinResourceIcon} />
  </span>
</div>

<style>
  .row {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .ratio {
    font-size: var(--text-xs);
  }
</style>
