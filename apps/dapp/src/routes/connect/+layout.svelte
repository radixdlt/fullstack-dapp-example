<script lang="ts">
  import '../../global.scss'
  import { onMount } from 'svelte'
  import { RadixDappToolkit, Logger } from '@radixdlt/radix-dapp-toolkit'
  import { publicConfig } from '$lib/public-config'

  let radixDappToolkit: RadixDappToolkit

  const { dAppDefinitionAddress, networkId } = publicConfig

  onMount(() => {
    const logger = Logger(1)

    radixDappToolkit = RadixDappToolkit({
      networkId,
      dAppDefinitionAddress: dAppDefinitionAddress ?? '',
      logger,
      featureFlags: ['ExperimentalMobileSupport']
    })
  })
</script>
