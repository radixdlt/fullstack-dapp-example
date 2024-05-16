<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { questApi } from '$lib/api/quest-api'
  import Backdrop from '$lib/components/backdrop/Backdrop.svelte'
  import Button from '$lib/components/button/Button.svelte'
  import { useCookies } from '$lib/utils/cookies'
  import { QuestDefinitions } from 'content'
  import { rdt } from '$lib/rdt'
  import { OneTimeDataRequestBuilder, SignedChallengeAccount } from '@radixdlt/radix-dapp-toolkit'
  import { userApi } from '$lib/api/user-api'

  let open = false

  const unlockQuests = async () => {
    for (let questId of Object.values(QuestDefinitions()).map((q) => q.id)) {
      useCookies(`quest-status-${questId}`).set('IN_PROGRESS')
      await questApi.startQuest(questId)
    }
    invalidateAll()
  }

  const registerAccount = () => {
    rdt.then((rdt) => {
      rdt.walletApi
        .sendOneTimeRequest(OneTimeDataRequestBuilder.accounts().exactly(1).withProof())
        .map(({ accounts, proofs }) => {
          const accountProof = proofs.find(
            (proof) => proof.type === 'account'
          )! as SignedChallengeAccount

          userApi.setUserField({
            accountAddress: accounts[0].address,
            proof: accountProof,
            field: 'accountAddress'
          })
        })
    })
  }

  const populate = () => {
    fetch('/api/user/populate-resources', {
      method: 'POST'
    })
  }

  const clearDb = async () => {
    await fetch('/api/user/clear-db', {
      method: 'POST'
    })
    invalidateAll()
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') open = false
  }
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

<div class="dev-mode">
  <Button
    on:click={() => {
      open = !open
    }}>Dev Config</Button
  >
</div>

{#if open}
  <Backdrop>
    <div class="card buttons">
      <Button on:click={unlockQuests}>Unlock All Quests</Button>
      <Button on:click={registerAccount}>Register Account</Button>
      <Button on:click={populate}>Populate With Resources</Button>
      <Button on:click={clearDb}>Clear Database</Button>
    </div>
  </Backdrop>
{/if}

<style lang="scss">
  .dev-mode {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 4;
    padding: var(--spacing-xl);
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
</style>
