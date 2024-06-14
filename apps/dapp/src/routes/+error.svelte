<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import '../global.scss'
  import JettyWorried from '@images/jetty-worried.png'
</script>

<div class="error-page">
  <div class="centered">
    <img src={JettyWorried} alt="worried jetty" />
    <div class="text">
      <h1>{$i18n.t('main:error-page.something-went-wrong')}</h1>
      {#if $page.status == 404}
        <span>
          <h4>{$i18n.t('main:error-page.page-not-found')}</h4>
        </span>
        <Button link="/home">{$i18n.t('main:error-page.go-home-button')}</Button>
      {:else}
        <h4>{$page.error?.message}</h4>
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
    background: var(--gradient-3) no-repeat center fixed;
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
