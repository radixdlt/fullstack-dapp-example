<script lang="ts">
  export let totalSteps: number
  export let step: number = 0
</script>

<div class="progress-bar" style:--steps={totalSteps} style:--step={step}></div>

<style lang="scss">
  .progress-bar {
    width: 100%;
    height: 0.2rem;
    background: rgba($color: black, $alpha: 0.2);
    position: relative;
  }

  .progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: calc(var(--step) / calc(var(--steps) - 1) * 100%);
    background: var(--color-background-dark);
    border-radius: var(--border-radius-lg);
    transition: width 0.3s ease-in-out;
  }
</style>
