<script>
  import { page } from '$app/stores'
  import ErrorPage from '../ErrorPage.svelte'
</script>

<ErrorPage>
  <div class="text">
    <div>
      Please go to <a href={'/'}>RadQuest</a> and log in with a persona that has a registered account
      with a hero badge.
    </div>

    <div>
      Error: <b>{$page?.error?.message || ''}</b>
    </div>
  </div>
</ErrorPage>

<style>
  .text {
    margin: var(--spacing-2xl);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  a {
    color: var(--color-primary);
  }
</style>
