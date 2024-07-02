<script lang="ts">
  import CurrentStatusPage from './CurrentStatusPage.svelte'
  import ReferralsPage from './ReferralsPage.svelte'
  import IntroPage from './IntroPage.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import Button from '$lib/components/button/Button.svelte'
  import OngoingQuest from '$lib/components/quest/OngoingQuest.svelte'
  import { userApi } from '$lib/api/user-api'
  import { onDestroy, onMount } from 'svelte'
  import { user, webSocketClient } from '../../../../../stores'
  import { messageApi } from '$lib/api/message-api'
  import type { WebSocketClient } from '$lib/websocket-client'

  let referralsData: { referrals: string[]; readyToClaim: number; claimed: number } = {
    referrals: [],
    readyToClaim: 0,
    claimed: 0
  }

  const getReferralsState = () => {
    userApi.getReferrals().map((data) => {
      referralsData = data
    })
  }

  let unsubscribeWebSocket: ReturnType<WebSocketClient['onMessage']> | undefined
  $: if ($webSocketClient && $user) {
    unsubscribeWebSocket = $webSocketClient.onMessage((message) => {
      if (message.type === 'QuestRewardsDeposited' && message.questId === 'ReferralQuest') {
        getReferralsState()
        messageApi.markAsSeen(message.id)
      }
    })
  }

  onDestroy(() => {
    unsubscribeWebSocket?.()
  })

  onMount(() => {
    getReferralsState()
  })
</script>

<OngoingQuest
  title={$i18n.t('quests:ReferralQuest.title')}
  steps={[{ hasFooter: true }, {}, { hasFooter: true }]}
>
  <svelte:fragment slot="content" let:progress let:next>
    {#if progress === 0}
      <IntroPage />
    {:else if progress === 1}
      <CurrentStatusPage
        {...referralsData}
        on:seeReferrals={() => {
          next()
        }}
        on:refresh={() => {
          getReferralsState()
        }}
      />
    {:else if progress === 2}
      <ReferralsPage referrals={referralsData.referrals} />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="footer" let:progress let:next let:back>
    {#if progress === 0}
      <Button
        on:click={() => {
          next()
        }}>{$i18n.t('quests:ReferralQuest.yourReferrals')}</Button
      >
    {:else if progress === 2}
      <Button
        secondary
        on:click={() => {
          back()
        }}>{$i18n.t('quests:backButton')}</Button
      >
    {/if}
  </svelte:fragment>
</OngoingQuest>
