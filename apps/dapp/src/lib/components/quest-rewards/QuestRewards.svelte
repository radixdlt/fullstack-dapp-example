<script lang="ts">
  import Icon from '../icon/Icon.svelte'
  import FragmentIcon from '@images/fragment.png'
  import XRDIcon from '@images/xrd.png'
  import PurpleCardIcon from '@images/purple-card.svg'
  import type { QuestRewardType } from 'virtual:quests'

  export let rewards: {
    type: QuestRewardType
    amount: number
  }[] = []

  const typeToIcon: Record<QuestRewardType, string> = {
    XRD: XRDIcon,
    Fragment: FragmentIcon,
    'Purple Card': PurpleCardIcon
  }
</script>

<div class="rewards">
  {#each rewards as { type, amount }}
    <div>
      <Icon url={typeToIcon[type]} size="small">
        {amount}
      </Icon>
    </div>
  {/each}
</div>

<style lang="scss">
  .rewards {
    flex-flow: row-reverse;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
  }
</style>
