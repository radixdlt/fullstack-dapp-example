<script lang="ts">
  import JettyActionButtons from '$lib/components/quest/JettyActionButtons.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import { user } from '../../../stores'
  import { writable } from 'svelte/store'
  import { userApi } from '$lib/api/user-api'

  export let text: string
  export let onBack: () => void
  export let onNext: () => void

  let nameInput = $user?.label ?? ''
  let canSaveName = writable(true)
  let error = ''

  const setUserName = async () => {
    $canSaveName = false
    const result = await userApi.setUserField({ name: nameInput, field: 'name' })
    $canSaveName = true

    if (result.isErr()) error = (result.error.data as any).message
    else {
      error = ''
      onNext()
    }
  }
</script>

{@html text}

<Input bind:value={nameInput} />
{error}

<JettyActionButtons isNextDisabled={!canSaveName} on:back={onBack} on:next={setUserName} />
