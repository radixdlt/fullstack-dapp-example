<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import Quest from '../Quest.svelte'
  import type { PageData } from './$types'
  import type { Quests } from 'content'
  import { user } from '../../../../../stores'
  import { Addresses } from 'common'
  import { PUBLIC_NETWORK_ID } from '$env/static/public'

  export let data: PageData

  const text = data.text as Quests['InstapassQuest']['text']

  let quest: Quest
  const { dapps } = Addresses(parseInt(PUBLIC_NETWORK_ID))
</script>

<Quest
  bind:this={quest}
  id={data.id}
  requirements={data.requirements}
  steps={[
    {
      id: '0',
      type: 'regular'
    },
    {
      type: 'requirements'
    },
    {
      type: 'claimRewards'
    },
    {
      type: 'complete'
    }
  ]}
  let:render
>
  {#if render('0')}
    <Button isExternal link={`${dapps.instapass.url}${$user?.accountAddress}`}>
      <span>{$i18n.t('quests:InstapassQuest.goToInstapass')}</span>
    </Button>
    {@html text['0.md']}
  {/if}
</Quest>

<style lang="scss">
</style>
