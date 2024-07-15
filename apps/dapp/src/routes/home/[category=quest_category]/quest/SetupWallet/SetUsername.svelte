<script lang="ts">
  import Input from '$lib/components/input/Input.svelte'
  import { user } from '../../../../../stores'
  import { writable } from 'svelte/store'
  import { userApi } from '$lib/api/user-api'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { onMount } from 'svelte'
  import WhiteCheckmark from '@images/white-checkmark.svg'
  let nameInput = $user?.name || $user?.label || ''
  let status = writable<'pristine' | 'loading' | 'completed'>('pristine')
  let error = ''

  onMount(() => {
    userApi.setUserFields({ fields: [{ name: nameInput, field: 'name' }] })
  })

  const setUserName = () => {
    status.set('loading')
    return userApi
      .setUserFields({ fields: [{ name: nameInput, field: 'name' }] })
      .map(() => {
        if ($user) {
          $user.name = nameInput
        }
        status.set('completed')

        error = ''
      })
      .mapErr((err) => {
        status.set('pristine')
        error = (err.data as any).message
      })
  }
</script>

<Input bind:value={nameInput} fullWidth maxLength={25} />
{error}

<div class="center">
  {#if $status === 'completed'}
    <img src={WhiteCheckmark} alt="" />
    {$i18n.t('quests:SetupWallet.usernameCompleted')}
  {:else}
    <Button on:click={setUserName} loading={$status === 'loading'}
      >{$i18n.t('quests:SetupWallet.confirmSetUsername')}</Button
    >
  {/if}
</div>

<style lang="scss">
  .center {
    margin-top: var(--spacing-xl);
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    justify-content: center;
  }
</style>
