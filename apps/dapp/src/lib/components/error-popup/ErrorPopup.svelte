<script lang="ts">
  import ErrorIcon from '@images/error.svg'
  import Popup from '../popup/Popup.svelte'

  export let title: string
</script>

<Popup on:close>
  <div class="error-popup-content">
    <img src={ErrorIcon} alt="" />
    <span class="bold title">{title}</span>

    <slot />
  </div>
</Popup>

<style lang="scss">
  div {
    line-height: 24px;
  }
  .title {
    margin: var(--spacing-sm) 0 var(--spacing-xl);
  }

  .bold {
    font-weight: var(--font-weight-bold);
  }

  .error-popup-content {
    padding: var(--spacing-xl);
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    @include shortMobile {
      padding: var(--spacing-md);
    }
  }
</style>
