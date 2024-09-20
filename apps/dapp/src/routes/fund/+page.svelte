<script lang="ts">
  import '../../global.scss'
  import { onMount } from 'svelte'
  import { RadixDappToolkit, Logger } from '@radixdlt/radix-dapp-toolkit'
  import { publicConfig } from '$lib/public-config'
  import Button from '$lib/components/button/Button.svelte'
  import Header from '$lib/components/header/Header.svelte'
  import { userApi } from '$lib/api/user-api'
  import type { GoldenTicket } from 'database'
  import { authApi } from '$lib/api/auth-api'
  import { gatewayApi } from '$lib/public-config'
  import { WebSocketClient } from '$lib/websocket-client'
  import Accordion from '$lib/components/accordion/Accordion.svelte'
  import CopyIcon from '@images/copy.svg'
  import Popup from '$lib/components/popup/Popup.svelte'
  import type { PageData } from './$types'
  import { i18n } from '$lib/i18n/i18n'

  export let data: PageData

  const { dAppDefinitionAddress, networkId } = publicConfig

  let radixDappToolkit: RadixDappToolkit

  let websocketClient: WebSocketClient

  onMount(() => {
    radixDappToolkit = RadixDappToolkit({
      networkId,
      dAppDefinitionAddress: dAppDefinitionAddress ?? '',
      logger: Logger(1)
    })

    radixDappToolkit.walletApi.walletData$.subscribe(({ persona }) => {
      if (persona?.identityAddress) {
        authApi.authToken().map(async (authToken) => {
          if (authToken) {
            websocketClient = WebSocketClient({ authToken, radixDappToolkit })
          }
        })
      }
    })
  })

  let amountOfTickets = 0

  const ticketPriceManifest = `CALL_METHOD Address("${publicConfig.components.ticketMachine}") "get_ticket_price";`

  const purchaseManifest = () => `
    CALL_METHOD
        Address("${data.accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${publicConfig.badges.heroBadgeAddress}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("<${data.id}>")
        )
    ;
    POP_FROM_AUTH_ZONE
        Proof("hero_badge_proof")
    ;

    CALL_METHOD
        Address("${data.accountAddress}")
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
        Address("${data.accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
  `

  const getPrice = () => gatewayApi.preview(ticketPriceManifest)

  let loadingPrice = false
  let sendingTransaction = false

  let price: number

  let mounted = false

  let ownedBatches: GoldenTicket[][] = []

  const getTickets = () =>
    userApi.getOwnedSilverTickets().map((response) => {
      ownedBatches = response
        ?.reduce((acc, ticket) => {
          const batch = acc.find((b) => b[0].batchId === ticket.batchId)
          if (batch) {
            batch.push(ticket)
          } else {
            acc.push([ticket])
          }
          return acc
        }, [] as GoldenTicket[][])
        .sort((a, b) => b[0].createdAt.getMilliseconds() - a[0].createdAt.getMilliseconds())
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
    unsub = websocketClient.onMessage((message) => {
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
    radixDappToolkit.walletApi
      .sendTransaction({
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

<div class="header">
  <Header />
</div>

<div class="container">
  <div class="card fund">
    <h3>{$i18n.t('main:silverTickets.header')}</h3>

    <input type="number" min="0" bind:value={amountOfTickets} />

    <div class="btn">
      <Button
        on:click={purchase}
        disabled={amountOfTickets === 0}
        loading={loadingPrice || sendingTransaction}
        >{amountOfTickets === 0
          ? $i18n.t('main:silverTickets.enter-quantity')
          : $i18n.t('main:silverTickets.purchase', { amount: price * amountOfTickets })}
      </Button>
    </div>

    {#if ownedBatches.length > 0}
      <div class="owned-tickets">
        <h4>{$i18n.t('main:silverTickets.purchased-header')}</h4>

        {#each ownedBatches as batch}
          <div class="batch">
            <Accordion>
              <svelte:fragment slot="header">
                <div class="header-text">
                  {$i18n.t('main:silverTickets.purchased-at')}:
                  <div class="header-info">
                    {batch[0].createdAt.toLocaleDateString()}
                  </div>
                </div>
              </svelte:fragment>

              <svelte:fragment slot="content">
                <b>{$i18n.t('main:silverTickets.expires-at')}:</b>
                {batch[0].expiresAt.toLocaleDateString()}
                {#if batch[0].description}
                  <div class="description">
                    {batch[0].description}
                  </div>
                {/if}
                <div class="set-info">
                  <Button
                    on:click={() => {
                      setInfoOnBatch = batch[0].batchId
                      showSetInfo = true
                    }}>{$i18n.t('main:silverTickets.set-info')}</Button
                  >
                </div>
                <div class="batches">
                  {#each batch as ticket}
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
              </svelte:fragment>
            </Accordion>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .header {
    :global(radix-connect-button) {
      display: none;
    }
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: var(--spacing-2xl);
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

  .header-text {
    font-weight: bold;
    padding: var(--spacing-lg);
    display: flex;
    gap: var(--spacing-md);
    white-space: nowrap;

    .header-info {
      font-weight: normal;
    }
  }

  .description {
    padding: var(--spacing-lg);
    font-style: italic;
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
