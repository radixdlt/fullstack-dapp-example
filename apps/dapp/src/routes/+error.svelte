<script lang="ts">
  import { page } from '$app/stores'
  import '../global.scss'
</script>

<div class="error-page">
  <div class="centered">
    <div class="text">
      <h1>Oops! Something went wrong</h1>
      <h4>{$page.error?.message}</h4>
    </div>
  </div>
</div>

<style lang="scss">
  .error-page {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100dvh;
    background: var(--gradient-3) no-repeat center fixed;
  }

  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
