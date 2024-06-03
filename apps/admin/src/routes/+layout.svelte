<script lang="ts">
  import { RadixDappToolkit, Logger } from 'common/rdt'
  import modeobserver from '$lib/modeobserver'
  import { onMount } from 'svelte'
  import { publicConfig } from '$lib/public-config'
  import { resolveRDT } from '$lib/rdt'

  let radixDappToolkit: RadixDappToolkit

  const { dAppDefinitionAddress, networkId } = publicConfig

  onMount(modeobserver)

  onMount(() => {
    const logger = Logger(1)

    radixDappToolkit = RadixDappToolkit({
      networkId,
      dAppDefinitionAddress: dAppDefinitionAddress ?? '',
      logger,
      featureFlags: ['ExperimentalMobileSupport']
    })

    resolveRDT(radixDappToolkit)
  })
</script>

<slot />
