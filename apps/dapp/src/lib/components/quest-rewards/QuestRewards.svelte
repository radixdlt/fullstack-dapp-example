<script lang="ts">
  import Icon from '../icon/Icon.svelte'
  import FragmentIcon from '@images/fragment.png'
  import XRDIcon from '@images/xrd.png'
  import PurpleCardIcon from '@images/purple-card.svg'
  import type { QuestReward } from 'content'

  export let rewards: QuestReward[] = []

  const typeToIcon: Record<string, string> = {
    xrd: XRDIcon,
    element: FragmentIcon,
    'Purple Card': PurpleCardIcon
  }
</script>

<div class="rewards">
  {#each rewards as { name, amount }}
    <div>
      <Icon url={typeToIcon[name]} size="small">
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
