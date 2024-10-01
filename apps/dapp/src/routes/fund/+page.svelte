<script lang="ts">
  import '../../global.scss'
  import { onMount } from 'svelte'
  import { publicConfig } from '$lib/public-config'
  import Button from '$lib/components/button/Button.svelte'
  import { userApi } from '$lib/api/user-api'
  import type { GoldenTicket, GoldenTicketBatch } from 'database'
  import { gatewayApi } from '$lib/public-config'
  import { webSocketClient, WebSocketClient } from '$lib/websocket-client'
  import Accordion from '$lib/components/accordion/Accordion.svelte'
  import CopyIcon from '@images/copy.svg'
  import Popup from '$lib/components/popup/Popup.svelte'
  import type { PageData } from './$types'
  import { i18n } from '$lib/i18n/i18n'
  import { hasHeroBadge, user } from '../../stores'
  import { sendTransaction } from '$lib/rdt'
  import { goldenTicketUtils } from 'common'
  import LoadingSpinner from '$lib/components/loading-spinner/LoadingSpinner.svelte'

  export let data: PageData

  let amountOfTickets = 0

  const ticketPriceManifest = `CALL_METHOD Address("${publicConfig.components.ticketMachine}") "get_ticket_price";`

  const purchaseManifest = () => `
    CALL_METHOD
        Address("${$user!.accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${publicConfig.badges.heroBadgeAddress}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("<${$user!.id}>")
        )
    ;
    POP_FROM_AUTH_ZONE
        Proof("hero_badge_proof")
    ;

    CALL_METHOD
        Address("${$user!.accountAddress}")
        "withdraw"
        Address("${publicConfig.xrd}")
        Decimal("${price * amountOfTickets}")
    ;

    TAKE_FROM_WORKTOP
        Address("${publicConfig.xrd}")
        Decimal("${price * amountOfTickets}")
        Bucket("xrd")
    ;

    CALL_METHOD
        Address("${publicConfig.components.ticketMachine}")
        "purchase_tickets"
        Proof("hero_badge_proof")
        Bucket("xrd")
    ;
    CALL_METHOD
        Address("${$user!.accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
  `

  const getPrice = () => gatewayApi.preview(ticketPriceManifest)

  let loadingPrice = false
  let sendingTransaction = false

  let price: number

  let mounted = false

  let ownedBatches: (GoldenTicketBatch & { ticketCount: number })[] = []

  const getTickets = () =>
    userApi.getOwnedTicketBatches().map((response) => {
      ownedBatches = response.sort(
        (a, b) => b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds()
      )
    })

  onMount(() => {
    mounted = true
    getTickets()
  })

  $: if (amountOfTickets && mounted) {
    loadingPrice = true
    getPrice().map((response) => {
      loadingPrice = false
      price = (response.receipt as any).output[0].programmatic_json.value
    })
  }

  let unsub: ReturnType<WebSocketClient['onMessage']> | undefined

  const handleMessage = () => {
    unsub = $webSocketClient!.onMessage((message) => {
      if (message.type === 'TicketsPurchased') {
        getTickets()
          .map(() => {
            unsub?.()
            sendingTransaction = false
          })
          .mapErr(() => {
            unsub?.()
            sendingTransaction = false
          })
      }
    })
  }

  const purchase = () => {
    sendingTransaction = true
    sendTransaction({
      transactionManifest: purchaseManifest()
    })
      .map(() => {
        handleMessage()
      })
      .mapErr(() => {
        sendingTransaction = false
      })
  }

  let showSetInfo = false
  let setInfoOnBatch: string
  let updateExpiresAt: string
  let updateDescription: string
  let updating = false

  const resetSetInfoState = () => {
    setInfoOnBatch = ''
    updateExpiresAt = ''
    updateDescription = ''
  }

  const downloadCsv = async (tickets: GoldenTicket[]) => {
    goldenTicketUtils.csv.writeRows(tickets, data.baseUrl)
    await goldenTicketUtils.csv.download()
    goldenTicketUtils.csv.clear()
  }

  const downloadQr = (tickets: GoldenTicket[]) => {
    goldenTicketUtils.qr.createZip(tickets, data.baseUrl)
  }

  let loadingBatch = false

  const tickets: { [key: string]: GoldenTicket[] } = {}
</script>

{#if showSetInfo}
  <Popup
    on:close={() => {
      showSetInfo = false
      resetSetInfoState()
    }}
  >
    <div class="set-info">
      <div class="input">
        <div>
          {$i18n.t('main:silverTickets.set-expiration')}:
          <input type="date" bind:value={updateExpiresAt} />
        </div>
        <div>
          {$i18n.t('main:silverTickets.set-description')}:
          <input type="text" bind:value={updateDescription} />
        </div>
      </div>
      <Button
        loading={updating}
        on:click={() => {
          updating = true
          userApi
            .updateSilverTicketBatch(
              setInfoOnBatch,
              updateExpiresAt ? new Date(updateExpiresAt) : undefined,
              updateDescription || undefined
            )
            .map(() => {
              updating = false
              showSetInfo = false
              resetSetInfoState()
              getTickets()
            })
            .mapErr(() => {
              updating = false
            })
        }}>{$i18n.t('main:silverTickets.save')}</Button
      >
    </div>
  </Popup>
{/if}

<div class="container">
  <div class="card fund">
    <h3>{$i18n.t('main:silverTickets.header')}</h3>

    <p>{@html $i18n.t('main:silverTickets.purchase-description')}</p>

    <input disabled={!$hasHeroBadge} type="number" min="0" bind:value={amountOfTickets} />

    <div class="btn">
      <Button
        on:click={purchase}
        disabled={!amountOfTickets || amountOfTickets === 0 || !$hasHeroBadge}
        loading={loadingPrice || sendingTransaction}
        >{!amountOfTickets || amountOfTickets === 0
          ? $i18n.t('main:silverTickets.purchase-empty')
          : $i18n.t('main:silverTickets.purchase', { amount: price * amountOfTickets })}
      </Button>
    </div>

    {#if !$hasHeroBadge}
      <p class="warning">
        {$i18n.t('main:silverTickets.not-logged-in')}
      </p>
    {/if}

    {#if ownedBatches.length > 0}
      <div class="owned-tickets">
        <h4>{$i18n.t('main:silverTickets.purchased-header')}</h4>

        {#each ownedBatches as batch}
          <div class="batch">
            <Accordion>
              <svelte:fragment slot="header">
                <button
                  class="accordion-header"
                  on:click={() => {
                    if (!tickets[batch.id]) {
                      loadingBatch = true
                      userApi.getTicketsInBatch(batch.id).map(({ data }) => {
                        tickets[batch.id] = data
                        loadingBatch = false
                      })
                    }
                  }}
                >
                  <div class="header-description">
                    {#if batch.description}
                      {batch.description}
                    {/if}
                  </div>
                  <div class="expires">
                    <b>{$i18n.t('main:silverTickets.expires-at')}:</b>
                    {batch.expiresAt.toLocaleDateString()}
                  </div>
                </button>
              </svelte:fragment>

              <svelte:fragment slot="content">
                {#if loadingBatch}
                  <div class="loading">
                    <LoadingSpinner />
                  </div>
                {:else}
                  <div class="set-info">
                    <Button
                      on:click={() => {
                        setInfoOnBatch = batch.id
                        showSetInfo = true
                      }}>{$i18n.t('main:silverTickets.set-info')}</Button
                    >
                  </div>

                  <b>{$i18n.t('main:silverTickets.quantity', { amount: batch.ticketCount })}</b>

                  <div class="download-btns">
                    <Button on:click={() => downloadCsv(tickets[batch.id])}>
                      {$i18n.t('main:silverTickets.download-csv')}
                    </Button>
                    <Button on:click={() => downloadQr(tickets[batch.id])}>
                      {$i18n.t('main:silverTickets.download-qr')}
                    </Button>
                  </div>

                  <div class="batches">
                    {#each tickets[batch.id] as ticket}
                      {@const link = `${data.baseUrl}?t=${ticket.id}`}
                      <div class="link">
                        <div class="text">
                          <button on:click={() => navigator.clipboard.writeText(link)}>
                            <img src={CopyIcon} alt="Copy" />
                          </button>
                          <div>{ticket.id}</div>
                        </div>
                        <div>
                          {$i18n.t('main:silverTickets.claimed')}: {ticket.claimedAt ? '✅' : '❌'}
                        </div>
                      </div>
                    {/each}
                  </div>
                {/if}
              </svelte:fragment>
            </Accordion>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: var(--spacing-2xl);
  }

  .warning {
    color: var(--color-error);
    font-weight: var(--font-weight-bold);
  }

  .fund {
    margin: var(--spacing-md);
    max-width: 25rem;
    text-align: center;
  }

  .btn {
    margin-top: var(--spacing-xl);
    display: flex;
    justify-content: center;
  }

  .owned-tickets {
    margin-top: var(--spacing-2xl);
  }

  input {
    background: var(--color-neutral);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-md);
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    padding: var(--spacing-md);
  }

  .batches {
    padding: var(--spacing-md);
  }

  .batch {
    margin-top: var(--spacing-md);
  }

  .set-info {
    margin: var(--spacing-xl) 0;
    display: flex;
    justify-content: center;
  }

  .download-btns {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin: var(--spacing-xl);
  }

  .accordion-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
    overflow: hidden;
    width: 100%;

    .header-description {
      text-align: left;
    }
  }

  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--text-xs);
    margin: 0 var(--spacing-md);

    .text {
      display: flex;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      align-items: center;

      white-space: nowrap;

      img {
        cursor: pointer;
        filter: invert(1);
        width: 1.2rem;
      }
    }
  }

  .set-info {
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    .input {
      display: flex;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
      flex-direction: column;
    }
  }
</style>
