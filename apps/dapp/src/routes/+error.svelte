<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import '../global.scss'
</script>

<div class="error-page">
  <div class="centered">
    <img src="/jetty-worried.png" alt="worried jetty" />
    <div class="text">
      {#if $page.status == 503}
        <h1>RadQuest is currently offline</h1>
      {:else}
        <h1>{$i18n.t('main:error-page.something-went-wrong')}</h1>
      {/if}

      {#if $page.status == 404}
        <span>
          <h4>{$i18n.t('main:error-page.page-not-found')}</h4>
        </span>
        <Button link="/home">{$i18n.t('main:error-page.go-home-button')}</Button>
      {:else if $page.status == 503}
        We are working to restore access as quickly as we can.
      {:else}
        <h4>{$page.error?.message}</h4>
        <Button link="/home">{$i18n.t('main:error-page.go-home-button')}</Button>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  h1,
  h4 {
    padding: 0;
    margin: 0;
  }
  .error-page {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100dvh;
    background: var(--gradient-7) no-repeat center fixed;
  }

  .centered {
    position: fixed;
    top: 7.125rem;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xl);
  }

  .text {
    width: 31.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);

    @include mobile {
      width: 19.063rem;
      text-align: center;
    }
  }
</style>
