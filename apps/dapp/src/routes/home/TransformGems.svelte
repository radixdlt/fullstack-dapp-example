<script lang="ts">
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import GemCard from '$lib/components/resource-card/GemCard.svelte'
  import TransformCard from '$lib/components/resource-card/TransformCard.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { createEventDispatcher } from 'svelte'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'
  import type { ColorCodeDescription, ShaderCodeDescription } from 'common'

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
    quality: string
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

    <Carousel let:Item>
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
    <Carousel let:Item>
      <Item>
        {#if selectedTransformCard !== undefined}
          <TransformCard disabled={true} selected={true} card={cards[selectedTransformCard]} />
        {/if}
      </Item>
      {#each selectedGems as i}
        <Item>
          <GemCard disabled={true} selected={true} gem={gems[i]} />
        </Item>
      {/each}
    </Carousel>
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
    action={{
      text: $i18n.t('jetty:create-radmorphs.create-radmorph-button'),
      onClick: () => createRadmorph(setWaitingForRadmorph, unsetWaitingForRadmorph, radmorphCreated)
    }}
    loading={waitingForRadmorphTx}
  >
    <div class="preview-title" slot="header">
      {preview.name.split('{')[0]}
    </div>
    <div class="preview">
      <div class="quality">
        {$i18n.t('jetty:create-radmorphs.radmorph-quality', { quality: preview.quality })}
        {#if preview.limitedEdition}
          <i>{$i18n.t('jetty:create-radmorphs.limited-edition')}</i>
        {/if}
      </div>
      <img src={preview.image} alt="A Radmorph" />
      {$i18n.t('jetty:create-radmorphs.radmorph-preview-text')}
      <div class="footnote">
        {$i18n.t('jetty:create-radmorphs.resources-sent-from-wallet')}
      </div>
    </div>
  </JettyMenuItemPage>
{/if}

{#if page === 5}
  <JettyMenuItemPage
    action={{
      text: 'Close',
      onClick: () => dispatch('complete')
    }}
  >
    <div class="success">
      <img src={preview.image} alt="A Radmorph" />
      {$i18n.t('jetty:create-radmorphs.radmorph-created')}
    </div>
  </JettyMenuItemPage>
{/if}

<style lang="scss">
  .title {
    font-size: var(--text-md3);
    text-align: center;
  }

  .preview-title {
    font-size: var(--text-md2);
    font-family: var(--font-headers);
    text-align: center;
  }

  .quality {
    font-family: var(--font-headers);
  }

  .preview {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    align-items: center;
    text-align: center;
    margin-bottom: -3rem;

    img {
      height: 150px;
    }
  }

  .fusing-animation {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footnote {
    font-size: var(--text-xs);
  }

  .success {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    align-items: center;
    text-align: center;

    img {
      height: 250px;
    }
  }
</style>
