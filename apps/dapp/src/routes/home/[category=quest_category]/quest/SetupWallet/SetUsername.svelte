<script lang="ts">
  import Input from '$lib/components/input/Input.svelte'
  import { user } from '../../../../../stores'
  import { writable } from 'svelte/store'
  import { userApi } from '$lib/api/user-api'
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { onMount } from 'svelte'

  let nameInput = $user?.name || $user?.label || ''
  let canSaveName = writable(true)
  let error = ''

  onMount(() => {
    setUserName()
  })

  const setUserName = async () => {
    $canSaveName = false
    const result = await userApi.setUserFields({ fields: [{ name: nameInput, field: 'name' }] })
    $canSaveName = true

    if (result.isErr()) error = (result.error.data as any).message
    else {
      if ($user) {
        $user.name = nameInput
      }

      error = ''
    }
  }
</script>

<Input bind:value={nameInput} />
{error}

<div class="center">
  <Button on:click={setUserName}>{$i18n.t('quests:SetupWallet.confirmSetUsername')}</Button>
</div>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
  }
</style>
