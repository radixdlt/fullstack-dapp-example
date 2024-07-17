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
  import { OneTimeDataRequestBuilder, fetchWrapper } from '@radixdlt/radix-dapp-toolkit'
  import { publicConfig } from '$lib/public-config'
  import { user } from '../../../stores'
  import { ErrorPopupId, errorPopupStore } from '$lib/components/error-popup/store'

  let open = false

  const unlockQuests = async () => {
    for (let questId of Object.values(QuestDefinitions()).map((q) => q.id)) {
      useCookies(`quest-status-${questId}`).set('IN_PROGRESS')
      await questApi.startQuest(questId)
    }
    invalidateAll()
  }

  const registerAccount = async () => {
    await rdt.then((rdt) => {
      rdt.walletApi
        .sendOneTimeRequest(OneTimeDataRequestBuilder.accounts().exactly(1))
        .andThen(({ accounts }) =>
          fetchWrapper(
            fetch('/api/debug', {
              method: 'POST',
              body: JSON.stringify({
                type: 'registerAccount',
                accountAddress: accounts[0].address
              })
            })
          ).map(() => {
            $user!.accountAddress = accounts[0].address
          })
        )
    })
  }

  const addPhoneNumber = async () => {
    await fetchWrapper(
      fetch('/api/debug', {
        method: 'POST',
        body: JSON.stringify({
          type: 'addPhoneNumber'
        })
      })
    )
  }

  const updateKycOracle = async () => {
    await fetchWrapper(
      fetch('/api/debug', {
        method: 'POST',
        body: JSON.stringify({
          type: 'updateKycOracle'
        })
      })
    )
  }

  const addReferral = async () => {
    await fetchWrapper(
      fetch('/api/debug', {
        method: 'POST',
        body: JSON.stringify({
          type: 'addReferral'
        })
      })
    )
  }

  const clearPhoneNumbers = async () => {
    await fetchWrapper(
      fetch('/api/debug', {
        method: 'POST',
        body: JSON.stringify({
          type: 'clearPhoneNumbers'
        })
      })
    )
  }

  const mintBadge = async () => {
    await rdt.then((rdt) => {
      rdt.walletApi.sendTransaction({
        transactionManifest: `             
          CALL_METHOD
              Address("${publicConfig.components.heroBadgeForge}")
              "claim_badge"
              Address("${$user?.accountAddress || ''}")
          ;
          CALL_METHOD
              Address("${$user?.accountAddress}")
              "deposit_batch"
              Expression("ENTIRE_WORKTOP")
          ;`
      })
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

  const setUserAsAdmin = async () => {
    await fetch('/api/user/type', {
      method: 'POST',
      body: JSON.stringify({ type: 'admin' })
    })
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
      {#if $user}
        <Button on:click={unlockQuests}>Unlock All Quests</Button>
        <Button on:click={registerAccount}>Register and populate account</Button>
        <Button on:click={mintBadge}>Mint hero badge (requires registered account)</Button>
        <Button on:click={clearDb}>Clear Database</Button>
        <Button on:click={setUserAsAdmin}>Set user as Admin</Button>
        <Button on:click={addPhoneNumber}>Bypass phone verification</Button>
        <Button on:click={addReferral}>Add referral</Button>
        <Button on:click={updateKycOracle}>Update KYC oracle</Button>
        <Button
          on:click={() => {
            console.log($user)
          }}>Log User</Button
        >
      {/if}
      <Button
        on:click={() => {
          errorPopupStore.set({
            id: ErrorPopupId.XrdRewardLimit
          })
        }}>Show Error</Button
      >

      <Button on:click={clearPhoneNumbers}>Clear phone numbers</Button>
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
