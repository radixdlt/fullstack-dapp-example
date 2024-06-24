<script lang="ts">
  import CurrentStatusPage from './CurrentStatusPage.svelte'
  import ReferralsPage from './ReferralsPage.svelte'
  import IntroPage from './IntroPage.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import Button from '$lib/components/button/Button.svelte'
  import OngoingQuest from '$lib/components/quest/OngoingQuest.svelte'
  import { userApi } from '$lib/api/user-api'

  let referrals: string[] = []

  userApi.getReferrals().map((data) => {
    referrals = data
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
        {referrals}
        on:seeReferrals={() => {
          next()
        }}
      />
    {:else if progress === 2}
      <ReferralsPage {referrals} />
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

<style lang="scss">
</style>
