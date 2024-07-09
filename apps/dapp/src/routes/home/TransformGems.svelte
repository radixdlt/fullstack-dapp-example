<script lang="ts">
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import GemCard from '$lib/components/transform-gems/GemCard.svelte'
  import TransformCard from '$lib/components/transform-gems/TransformCard.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { createEventDispatcher } from 'svelte'
  import JettyMenuItemPage from './JettyMenuItemPage.svelte'

  export let cards: {
    id: string
    energy: string
    image: string
    rarity: string
  }[] = []

  export let gems: {
    id: string
    material: string
    rarity: string
    image: string
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
    firstRadmorph: string
    secondRadmorph: string
    quality: number
    image: string
  } = {
    firstRadmorph: 'Radiant Flame',
    secondRadmorph: 'Molten Core',
    quality: 0,
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

<div class="content" class:content-grid={page < 5}>
  <div class="title">
    {#if page === 0}
      {#if selectedTransformCard !== undefined}
        {$i18n.t('jetty:create-radmorphs.title-card-selected')}
      {:else}
        {$i18n.t('jetty:create-radmorphs.title-pick-card')}
      {/if}
    {/if}
    {#if page === 1}
      {#if selectedGems.length === 0}
        {$i18n.t('jetty:create-radmorphs.title-pick-2-gems')}
      {:else if selectedGems.length === 1}
        {$i18n.t('jetty:create-radmorphs.title-pick-1-gem')}
      {:else}
        {$i18n.t('jetty:create-radmorphs.title-gems-selected')}
      {/if}
    {/if}
    {#if page === 2}
      {$i18n.t('jetty:create-radmorphs.title-review')}
    {/if}
    {#if page === 3}
      {$i18n.t('jetty:create-radmorphs.previewing-radmorph')}...
    {/if}

    {#if page === 4}
      <div class="preview-title">
        {$i18n.t('jetty:create-radmorphs.radmorph-preview-title', {
          firstRadmorph: preview.firstRadmorph,
          secondRadmorph: preview.secondRadmorph
        })}
      </div>
    {/if}
  </div>

  <div class="items">
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
        <Carousel let:Item>
          {#each cards as card, i}
            <Item>
              <TransformCard
                image={card.image}
                energy={card.energy}
                rarity={card.rarity}
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
        <Carousel let:Item>
          {#each gems as gem, i}
            <Item>
              <GemCard
                image={gem.image}
                gemstone={gem.material}
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
        <Carousel let:Item>
          <Item>
            {#if selectedTransformCard !== undefined}
              <TransformCard
                selectable={false}
                selected={true}
                image={cards[selectedTransformCard].image}
                energy={cards[selectedTransformCard].energy}
                rarity={cards[selectedTransformCard].rarity}
              />
            {/if}
          </Item>
          {#each selectedGems as i}
            <Item>
              <GemCard
                selectable={false}
                selected={true}
                image={gems[i].image}
                gemstone={gems[i].material}
              />
            </Item>
          {/each}
        </Carousel>
      </JettyMenuItemPage>
    {/if}

    {#if page === 4}
      <JettyMenuItemPage
        action={{
          text: $i18n.t('jetty:create-radmorphs.create-radmorph-button'),
          onClick: () =>
            createRadmorph(setWaitingForRadmorph, unsetWaitingForRadmorph, radmorphCreated)
        }}
        loading={waitingForRadmorphTx}
      >
        <div class="preview">
          <div>
            {$i18n.t('jetty:create-radmorphs.radmorph-quality', { quality: preview.quality })}
          </div>
          <img src={preview.image} alt="A Radmorph" />
          {$i18n.t('jetty:create-radmorphs.radmorph-preview-text')}
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
  </div>
</div>

<style lang="scss">
  .title {
    grid-area: 1 / 1;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: end;
  }

  .content {
    height: 100%;
    color: var(--color-light);
  }

  .content-grid {
    gap: var(--spacing-xl);
    display: grid;
    grid-template-rows: 2rem auto;
  }

  .items {
    overflow-x: hidden;
    height: 100%;
  }

  .preview-title {
    font-size: var(--text-md2);
    font-family: var(--font-headers);
  }

  .preview {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    align-items: center;
    text-align: center;

    img {
      height: 10rem;
    }
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
