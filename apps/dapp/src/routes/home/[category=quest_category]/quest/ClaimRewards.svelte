<script lang="ts" context="module">
  export const determineIfQuestRewardV2 = (userId: string, questId: QuestId) => {
    type Reward = {
      resourceAddress: string
      amount: string
    }
    const transformPreviewResponseToQuestRewards = (
      response: ReturnType<Awaited<ReturnType<typeof gatewayApi.getPreviewOutput>>['_unsafeUnwrap']>
    ) => {
      if (response) {
        const enumFields = SborHelper.getEnumFields(response)

        if (enumFields) {
          return enumFields
            .map((field) => {
              const mapEntries = SborHelper.getMapEntries(field)
              if (mapEntries) {
                return mapEntries
                  .map((mapEntry): Reward | undefined => {
                    const { key, value } = mapEntry
                    const enumFields = SborHelper.getEnumFields(value) ?? []
                    const [amountField] = enumFields

                    const resourceAddress = SborHelper.getReferenceFieldValue(key)
                    const amount = SborHelper.getDecimalFieldValue(amountField)

                    if (!resourceAddress || !amount) return undefined
                    return {
                      resourceAddress,
                      amount
                    }
                  })
                  .filter((item): item is Reward => !!item)
              }
            })
            .filter((item): item is Reward[] => !!item)
            .flat()
        }
      }
      return undefined
    }

    return gatewayApi
      .getPreviewOutput(
        `CALL_METHOD
            Address("${publicConfig.components.questRewardsV2}")
            "get_rewards_state"
            "${userId}"
            "${questId}"
        ;`
      )
      .map(transformPreviewResponseToQuestRewards)
  }
</script>

<script lang="ts">
  import { sendTransaction } from '$lib/rdt'
  import { createEventDispatcher, onMount } from 'svelte'
  import { QuestDefinitions, type QuestId, type Quests } from 'content'
  import { questApi } from '$lib/api/quest-api'
  import Icon from '$lib/components/icon/Icon.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { ErrorPopupId, errorPopupStore, isUserBlocked, user } from '../../../../stores'
  import {
    createClaimRewardsTransaction,
    createClaimRewardsV2Transaction,
    handleKycBadge
  } from '$lib/helpers/create-claim-rewards-transaction'
  import Button from '$lib/components/button/Button.svelte'
  import { writable } from 'svelte/store'
  import { gatewayApi, publicConfig } from '$lib/public-config'
  import { SborHelper } from 'common'

  export let questId: keyof Quests
  export let text: string

  const loading = writable<boolean>(false)
  const rewards = QuestDefinitions()[questId].rewards
  const dispatch = createEventDispatcher<{ claimed: undefined }>()

  onMount(async () => {
    const result = await questApi.getQuestInformation(questId)

    if (result.isOk()) {
      const { status } = result.value
      if (status === 'REWARDS_CLAIMED' || status === 'COMPLETED') {
        dispatch('claimed')
      }
    }
  })

  export const claim = () => {
    if ($isUserBlocked) {
      errorPopupStore.set({ id: ErrorPopupId.CannotClaimRewards })
      return
    }
    const sendTx = (instapassBadge?: string) =>
      questApi.getDepositedRewards(questId).andThen((rewards) =>
        sendTransaction({
          transactionManifest: createClaimRewardsTransaction(
            $user?.accountAddress!,
            $user?.id!,
            questId,
            rewards,
            instapassBadge
          )
        })
      )

    loading.set(true)

    return determineIfQuestRewardV2($user?.id!, questId)
      .andThen((maybeRewards) => {
        if (maybeRewards) {
          console.log(
            createClaimRewardsV2Transaction(
              $user?.accountAddress!,
              $user?.id!,
              questId,
              maybeRewards
            )
          )
          return sendTransaction({
            transactionManifest: createClaimRewardsV2Transaction(
              $user?.accountAddress!,
              $user?.id!,
              questId,
              maybeRewards
            )
          })
        }
        return handleKycBadge($user?.id!, $user?.accountAddress!, sendTx)
      })
      .map((txResult) => {
        loading.set(false)
        if (txResult) dispatch('claimed')
      })
      .mapErr(() => {
        loading.set(false)
      })
  }
</script>

<div class="rewards">
  <div class="description">{@html text}</div>
  <div class="rewards-list">
    {#each rewards as { name, amount }}
      <div class="row">
        <Icon url={''} size="large" />
        <div class="reward-text">
          {amount}
          {$i18n.t(`rewards:${name}`, { count: amount })}
        </div>
      </div>
    {/each}
  </div>
  <Button on:click={claim} loading={$loading} --min-width="9rem">
    {$i18n.t('quests:claimButton')}
  </Button>
</div>

<style lang="scss">
  .rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2xl);
  }

  .rewards-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .reward-text {
    text-transform: capitalize;
    font-weight: var(--font-weight-bold);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
  }

  .description {
    width: 100%;
    text-align: left;
  }
</style>
