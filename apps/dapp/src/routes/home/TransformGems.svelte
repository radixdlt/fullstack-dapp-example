<script lang="ts">
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import GemCard from '$lib/components/resource-card/GemCard.svelte'
  import TransformCard from '$lib/components/resource-card/TransformCard.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { createEventDispatcher } from 'svelte'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'
  import type { ColorCodeDescription, ShaderCodeDescription } from 'common'
  import { onDestroy } from 'svelte'
  import { waitingWarning } from '$lib/utils/waiting-warning'

  export let cards: {
    id: string
    energy: string
    rarity: string
    quality: number
    limitedEdition: boolean
  }[] = []

  export let gems: {
    id: string
    material: ShaderCodeDescription
    color: ColorCodeDescription
    quality: number
  }[] = []

  export let getPreview: () => Promise<typeof preview>

  export let createRadmorph: (
    setLoading: () => void,
    unsetLoading: () => void,
    success: () => void
  ) => void

  let transformCardComponents: TransformCard[] = []
  let gemCardComponents: GemCard[] = []

  let selectedTransformCard: number | undefined

  let selectedGems: number[] = []

  let preview: {
    name: string
    quality: number
    limitedEdition: boolean
    image: string
  } = {
    name: '',
    quality: 0,
    limitedEdition: true,
    image: ''
  }

  const onTransformCardSelected = (i: number) => {
    selectedTransformCard = i
    for (let j = 0; j < cards.length; j++) {
      if (j !== i) transformCardComponents[j].deselect()
    }
    dispatch('selectedCard', cards[i])
  }

  const onTransformCardDeselected = () => {
    selectedTransformCard = undefined
  }

  const onGemCardSelected = (i: number) => {
    if (selectedGems.length > 1) {
      gemCardComponents[i].deselect()
      selectedGems = selectedGems.filter((_i) => _i !== i)
    } else {
      selectedGems = [...selectedGems, i]
    }
    dispatch('selectedGems', [gems[selectedGems[0]], gems[selectedGems[1]]])
  }

  const onGemCardDeselected = (i: number) => {
    selectedGems = selectedGems.filter((_i) => _i !== i)
  }

  const dispatch = createEventDispatcher<{
    cancel: undefined
    complete: undefined
    selectedCard: (typeof cards)[number]
    selectedGems: [(typeof gems)[number], (typeof gems)[number]]
  }>()

  let page = 0

  let waitingForRadmorphTx = false

  const setWaitingForRadmorph = () => (waitingForRadmorphTx = true)

  const unsetWaitingForRadmorph = () => (waitingForRadmorphTx = false)

  const radmorphCreated = () => {
    page = 5
  }

  $: waitingWarning(page === 3)

  onDestroy(() => {
    waitingWarning(false)
  })
</script>

{#if page === 0}
  <JettyMenuItemPage
    actions={{
      left: {
        text: $i18n.t('quests:backButton'),
        onClick: () => dispatch('cancel')
      },
      right: {
        text: $i18n.t('quests:continueButton'),
        onClick: () => {
          page++
        }
      }
    }}
    disabled={selectedTransformCard === undefined}
  >
    <div slot="header" class="title">
      {#if selectedTransformCard !== undefined}
        {$i18n.t('jetty:create-radmorphs.title-card-selected')}
      {:else}
        {$i18n.t('jetty:create-radmorphs.title-pick-card')}
      {/if}
    </div>
    <div class="cards">
      <Carousel let:Item stepSize={100}>
        {#each cards as card, i}
          <Item>
            <TransformCard
              {card}
              selected={i === selectedTransformCard}
              bind:this={transformCardComponents[i]}
              on:selected={() => onTransformCardSelected(i)}
              on:deselected={onTransformCardDeselected}
            />
          </Item>
        {/each}
      </Carousel>
    </div>
  </JettyMenuItemPage>
{/if}

{#if page === 1}
  <JettyMenuItemPage
    actions={{
      left: {
        text: $i18n.t('quests:backButton'),
        onClick: () => page--
      },
      right: {
        text: $i18n.t('quests:continueButton'),
        onClick: () => page++
      }
    }}
    disabled={selectedGems.length < 2}
  >
    <div slot="header" class="title">
      {#if selectedGems.length === 0}
        {$i18n.t('jetty:create-radmorphs.title-pick-2-gems')}
      {:else if selectedGems.length === 1}
        {$i18n.t('jetty:create-radmorphs.title-pick-1-gem')}
      {:else}
        {$i18n.t('jetty:create-radmorphs.title-gems-selected')}
      {/if}
    </div>
    <div class="cards">
      <Carousel let:Item>
        {#each gems as gem, i}
          <Item>
            <GemCard
              {gem}
              selected={selectedGems.includes(i)}
              bind:this={gemCardComponents[i]}
              on:selected={() => onGemCardSelected(i)}
              on:deselected={() => onGemCardDeselected(i)}
            />
          </Item>
        {/each}
      </Carousel>
    </div>
  </JettyMenuItemPage>
{/if}

{#if page === 2}
  <JettyMenuItemPage
    actions={{
      left: {
        text: $i18n.t('quests:backButton'),
        onClick: () => page--
      },
      right: {
        text: $i18n.t('jetty:create-radmorphs.generate-preview'),
        onClick: () => {
          page++
          getPreview().then((_preview) => {
            preview = _preview
            page = 4
          })
        }
      }
    }}
  >
    <div slot="header" class="title">
      {$i18n.t('jetty:create-radmorphs.title-review')}
    </div>

    <div class="chosen-cards cards">
      {#if selectedTransformCard !== undefined}
        <TransformCard disabled={true} selected={true} card={cards[selectedTransformCard]} />
      {/if}

      {#each selectedGems as i}
        <GemCard disabled={true} selected={true} gem={gems[i]} />
      {/each}
    </div>
  </JettyMenuItemPage>
{/if}

{#if page === 3}
  <JettyMenuItemPage>
    <div slot="header" class="title">
      {$i18n.t('jetty:create-radmorphs.previewing-radmorph')}
    </div>

    <div class="fusing-animation">
      <lottie-player autoplay loop mode="normal" src="/lottie/loading.json" style="width: 300px" />
    </div>
  </JettyMenuItemPage>
{/if}

{#if page === 4}
  <JettyMenuItemPage
    actions={{
      left: {
        text: $i18n.t('jetty:create-radmorphs.start-again-button'),
        onClick: () => {
          page = 0
          selectedTransformCard = undefined
          selectedGems = []
        }
      },
      right: {
        text: $i18n.t('jetty:create-radmorphs.create-radmorph-button'),
        onClick: () =>
          createRadmorph(setWaitingForRadmorph, unsetWaitingForRadmorph, radmorphCreated)
      }
    }}
    loading={waitingForRadmorphTx}
  >
    <div class="preview-title" slot="header">
      {preview.name.split('{')[0]}
      <div class="quality">
        {$i18n.t('jetty:create-radmorphs.radmorph-quality', { quality: preview.quality })}
        {#if preview.limitedEdition}
          <i>{$i18n.t('jetty:create-radmorphs.limited-edition')}</i>
        {/if}
      </div>
    </div>
    <div class="preview content">
      <div class="preview-image">
        <img style:width="100%" src={preview.image} alt="A Radmorph" />
        <div class="preview-pill">
          {$i18n.t('jetty:create-radmorphs.preview-pill-text')}
        </div>
      </div>
      {$i18n.t('jetty:create-radmorphs.radmorph-preview-text')}
    </div>
  </JettyMenuItemPage>
  <div class="footnote">
    {$i18n.t('jetty:create-radmorphs.resources-sent-from-wallet')}
  </div>
{/if}

{#if page === 5}
  <JettyMenuItemPage
    action={{
      text: 'Close',
      onClick: () => dispatch('complete')
    }}
  >
    <div class="success content">
      <img src={preview.image} alt="A Radmorph" />
      {$i18n.t('jetty:create-radmorphs.radmorph-created')}
    </div>
  </JettyMenuItemPage>
{/if}

<style lang="scss">
  .title {
    font-size: var(--text-md3);
    text-align: center;
    white-space: nowrap;
  }

  .preview-title {
    font-size: var(--text-md2);
    font-family: var(--font-headers);
    text-align: center;
  }

  .quality {
    font-family: var(--font-headers);
    margin-top: var(--spacing-md);
    font-size: var(--text-sm);
  }

  .preview {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    align-items: center;
    text-align: center;
    height: 100%;
    justify-content: center;
  }

  .preview-image {
    position: relative;
    height: 150px;
    width: 150px;
    border: var(--border-lg) var(--color-primary);
  }

  .content {
    padding: 0 var(--spacing-2xl);

    @include mobile {
      padding: 0 var(--spacing-xl);
    }
  }

  .preview-pill {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    padding: var(--spacing-xs) var(--spacing-lg);
    font-size: var(--text-xxs);
    font-weight: var(--font-weight-bold);
    height: 1.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-primary);
    border-radius: var(--border-radius-xl);
  }

  .cards {
    height: 100%;
    display: flex;
    justify-content: center;
    transform: translateY(-2rem);
    @include short {
      :global(.carousel) {
        transform: translateY(1rem);
      }
      :global(.carousel > .item) {
        padding-bottom: 4rem;
      }
    }
  }

  .chosen-cards {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    :global(.main-card) {
      @include mobile() {
        margin: var(--spacing-sm);
      }
    }

    :global(.transform-card),
    :global(.container) {
      height: 10rem;
      @include short {
        height: 8rem;
      }
    }
  }

  .fusing-animation {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .footnote {
    font-size: var(--text-xs);
    color: var(--color-light);
    text-align: center;
    padding-bottom: var(--spacing-xl);
  }

  .success {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    align-items: center;
    text-align: center;
    padding-top: var(--spacing-2xl);

    img {
      height: 250px;
      @include short {
        height: 200px;
      }
    }
  }
</style>
