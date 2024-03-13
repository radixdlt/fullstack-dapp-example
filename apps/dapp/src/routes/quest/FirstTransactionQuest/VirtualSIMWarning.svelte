<script>
  import Icon from '$lib/components/icon/Icon.svelte'
  import InfoIcon from '@images/info.svg'
</script>

<div class="text-faded">
  <Icon url={InfoIcon} --size="16px">
    <div class="info-text">Virtual SIM card is not allowed</div>
  </Icon>
</div>

<style>
  .info-text {
    font-size: var(--text-xxs);
  }
</style>
