<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import ClockIcon from '@images/clock.svg'
  export let title: string
  export let description: string
  export let minutesToComplete: number
  export let reduceDescriptionOpacity = false
</script>

<div class="text-content">
  <h3 class="title">
    {title}
  </h3>
  <div class="icon-and-label">
    <img src={ClockIcon} alt="Clock icon" />
    <p class="text-label">
      {$i18n.t('quests:minutesToComplete', { count: minutesToComplete })}
    </p>
  </div>
  <p class:reduce-opacity={reduceDescriptionOpacity} class="text-extra-light description">
    {description}
  </p>
</div>

<style lang="scss">
  h3,
  p {
    margin: 0;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-lg);
    text-align: center;
    overflow: hidden;
  }

  .title {
    max-height: 15rem;
    overflow: hidden;
  }

  .description {
    overflow: hidden;
    max-height: 5rem;
  }

  .icon-and-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .reduce-opacity {
    opacity: 0.5;
  }
</style>
