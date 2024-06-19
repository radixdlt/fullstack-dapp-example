<script lang="ts" context="module">
  import { writable } from 'svelte/store'

  let hide = writable(false)
</script>

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
        .andThen(({ accounts, proofs }) => {
          const accountProof = proofs.find(
            (proof) => proof.type === 'account'
          )! as SignedChallengeAccount

          return userApi.setUserField({
            accountAddress: accounts[0].address,
            proof: accountProof,
            field: 'accountAddress'
          })
        })
        .map(() => {
          userApi.mintHeroBadge()
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

  const clearLocalStorageAndCookies = () => {
    localStorage.clear()
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })
    invalidateAll()
  }
</script>

<svelte:window on:keydown={(e) => handleKeydown(e)} />

{#if !$hide}
  <div class="dev-mode">
    <Button
      on:click={() => {
        open = !open
      }}>Dev Config</Button
    >
  </div>
{/if}

{#if open}
  <Backdrop>
    <div class="card buttons">
      <Button on:click={unlockQuests}>Unlock All Quests</Button>
      <Button on:click={registerAccount}>Register Account + badge</Button>
      <Button on:click={populate}>Populate With Resources (requires log in + account)</Button>
      <Button on:click={clearDb}>Clear Database (requires log in)</Button>
      <Button on:click={clearLocalStorageAndCookies}>Clear Local Storage</Button>
      <Button
        on:click={() => {
          $hide = true
          open = false
        }}>Hide Dev Config</Button
      >
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
