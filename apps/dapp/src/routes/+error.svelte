<script>
  import ErrorPage from './ErrorPage.svelte'
  import { page } from '$app/stores'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
</script>

<ErrorPage>
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
</ErrorPage>
