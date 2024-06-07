<script lang="ts">
  import '../../global.scss'
  import { onMount } from 'svelte'
  import { RadixDappToolkit, Logger } from '@radixdlt/radix-dapp-toolkit'
  import { publicConfig } from '$lib/public-config'

  const { dAppDefinitionAddress, networkId } = publicConfig

  onMount(() => {
    RadixDappToolkit({
      networkId,
      dAppDefinitionAddress: dAppDefinitionAddress ?? '',
      logger: Logger(1)
    })
  })
</script>
