<script lang="ts">
  import { RadixDappToolkit, Logger } from 'common/rdt'
  import modeobserver from '$lib/modeobserver'
  import { onMount } from 'svelte'
  import { publicConfig } from '$lib/public-config'
  import type { LayoutData } from './$types'
  import { user, rdt } from '$lib/stores'

  export let data: LayoutData

  user.set(data.user)

  onMount(modeobserver)

  onMount(() => {
    const { dAppDefinitionAddress, networkId } = publicConfig

    rdt.set(
      RadixDappToolkit({
        networkId,
        dAppDefinitionAddress: dAppDefinitionAddress ?? '',
        logger: Logger(1),
        featureFlags: ['ExperimentalMobileSupport']
      })
    )
  })
</script>

<slot />
