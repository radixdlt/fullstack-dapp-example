<script lang="ts">
  export let title: string
  export let description: string
  export let minutesToComplete: number
  export let reduceDescriptionOpacity = false
  export let greyOut = false
</script>

<div class="text-content" class:grey-out={greyOut}>
  <h3 class="title">
    {title}
  </h3>

  <p class:reduce-opacity={reduceDescriptionOpacity} class="text-extra-light description">
    {description}
  </p>
</div>

<style lang="scss">
  h3,
  p {
    margin: 0;
  }

  .grey-out {
    opacity: 0.5;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-lg);
    text-align: center;
    overflow: hidden;
    @include shortMobile {
      gap: var(--spacing-md);
    }
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
</style>
