<script lang="ts">
  import { goto } from '$app/navigation'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import DepositUserBadge from '$lib/components/deposit-user-badge/DepositUserBadge.svelte'
  import DefQuest from '$lib/components/quest/DefQuest.svelte'
  import VerifyPhoneNumber from '$lib/components/verify-phone-number/VerifyPhoneNumber.svelte'
  import CompleteQuest from '$lib/components/complete-quest/CompleteQuest.svelte'
  import VerifyRequirements from '$lib/components/verify-requirements/VerifyRequirements.svelte'
  import ClaimRewards from '$lib/components/claim-rewards/ClaimRewards.svelte'
  import { quests } from '../../../stores'
  import type { PageData } from './$types'

  export let data: PageData

  const components = {
    VerifyPhoneNumber: {
      component: VerifyPhoneNumber
    },
    CompleteQuest: {
      component: CompleteQuest,
      properties: {
        questId: data.id
      }
    },
    DepositUserBadge: {
      component: DepositUserBadge
    },
    VerifyRequirements: {
      component: VerifyRequirements,
      properties: {
        questId: data.id
      }
    },
    ClaimRewards: {
      component: ClaimRewards,
      properties: {
        questId: data.id
      }
    }
  }

  const quest = $quests.find((quest) => quest.id === data.id)!

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  }

  const close = () => goto('/')
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<Backdrop>
  <div class="container">
    <div class="quest">
      <DefQuest {quest} {components} on:close={close} />
    </div>
  </div>
</Backdrop>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .quest {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    max-height: 50rem;
    width: 80vw;
    max-width: 50rem;
  }
</style>
