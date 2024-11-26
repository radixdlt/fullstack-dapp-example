<script lang="ts">
  import '../../global.scss'
  import { onMount, tick } from 'svelte'
  import { Logger, isMobile } from '@radixdlt/radix-dapp-toolkit'
  import { goto } from '$app/navigation'
  import { quests, user } from '../../stores'
  import Layout from '$lib/components/layout/Layout.svelte'
  import Tabs from '$lib/components/tabs/Tabs.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { questApi } from '$lib/api/quest-api'
  import { loadQuests, QuestCategory, type QuestId } from 'content'
  import LandingPopup from './LandingPopup.svelte'
  import { page } from '$app/stores'
  import type { LayoutData } from './$types'
  import { useCookies } from '$lib/utils/cookies'
  import Jetty from './Jetty.svelte'
  import ErrorPopup from './ErrorPopup.svelte'

  export let data: LayoutData

  $quests = data.questDefinitions
  $: tick().then(() => ($quests = loadQuests('en')))

  const setGetWalletRequirementInStore = () => {
    // @ts-ignore
    useCookies('requirement-SetupWallet-ConnectWallet').set(true)
    // @ts-ignore
    useCookies('requirement-SetupWallet-DownloadWallet').set(true)
  }

  onMount(() => {
    if (isMobile() && $page.url.searchParams.get('wallet') === 'true') {
      setGetWalletRequirementInStore()
    }

    const savedProgress = localStorage.getItem('savedProgress')

    if (savedProgress) {
      const { questId, progress } = JSON.parse(savedProgress)
      goto(`/home/${$quests[questId as QuestId].category}/quest/${questId}#${progress}`)
    } else if ($user) {
      questApi.getSavedProgress().map((savedProgress) => {
        if (savedProgress.questId)
          goto(
            `home/${$quests[savedProgress.questId as QuestId].category}/quest/${savedProgress.questId}#${savedProgress.progress}`
          )
      })
    }
  })
</script>

<Jetty />

<Layout>
  <svelte:fragment slot="quests">
    <slot />
  </svelte:fragment>
</Layout>
