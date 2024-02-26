<script lang="ts">
  import Carousel from '$lib/components/carousel/Carousel.svelte'
  import Button from '../button/Button.svelte'
  import ProgressCard from '../progress-card/ProgressCard.svelte'
  import TransformCard from './TransformCard.svelte'
  import { fade } from 'svelte/transition'
  import GemCard from './GemCard.svelte'
  import { i18n } from '$lib/i18n'
  import { createEventDispatcher } from 'svelte'
  import CardHeader from '../card-header/CardHeader.svelte'

  export let transformCards: {
    title: string
    description: string
    image: string
  }[] = []

  export let gems: {
    gemstone: string
    rarity: string
    image: string
  }[] = []

  let transformCardComponents: TransformCard[] = []
  let gemCardComponents: GemCard[] = []

  let selectedTransformCard: number | undefined

  let selectedGems: number[] = []

  const onTransformCardSelected = (i: number) => {
    selectedTransformCard = i
    for (let j = 0; j < transformCards.length; j++) {
      if (j !== i) transformCardComponents[j].deselect()
    }
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
  }

  const onGemCardDeselected = (i: number) => {
    selectedGems = selectedGems.filter((_i) => _i !== i)
  }

  const dispatch = createEventDispatcher<{
    complete: undefined
  }>()

  let progress: number
</script>

<ProgressCard bind:progress steps={Array(3).fill({})}>
  <div slot="header" class="header">
    {#if progress > 0}
      <CardHeader on:click={() => progress--}>
        {$i18n.t('transformGems_back')}
      </CardHeader>
    {/if}
  </div>

  <div class="content" slot="content">
    <div class="title">
      {#if progress === 0}
        {$i18n.t('transformGems_title_0')}
      {/if}
      {#if progress === 1}
        {$i18n.t('transformGems_title_1')}
      {/if}
      {#if progress === 2}
        {$i18n.t('transformGems_title_2')}
      {/if}
    </div>

    {#key progress}
      <div class="container" transition:fade={{ duration: 300 }}>
        {#if progress === 0}
          <Carousel let:Item>
            {#each transformCards as card, i}
              <Item>
                <TransformCard
                  backgroundImage={card.image}
                  title={card.title}
                  description={card.description}
                  selected={i === selectedTransformCard}
                  bind:this={transformCardComponents[i]}
                  on:selected={() => onTransformCardSelected(i)}
                  on:deselected={onTransformCardDeselected}
                />
              </Item>
            {/each}
          </Carousel>
        {/if}

        {#if progress === 1}
          <Carousel let:Item>
            {#each gems as gem, i}
              <Item>
                <GemCard
                  image={gem.image}
                  gemstone={gem.gemstone}
                  rarity={gem.rarity}
                  selected={selectedGems.includes(i)}
                  bind:this={gemCardComponents[i]}
                  on:selected={() => onGemCardSelected(i)}
                  on:deselected={() => onGemCardDeselected(i)}
                />
              </Item>
            {/each}
          </Carousel>
        {/if}

        {#if progress === 2}
          <Carousel let:Item>
            <Item>
              {#if selectedTransformCard !== undefined}
                <TransformCard
                  selectable={false}
                  selected={true}
                  backgroundImage={transformCards[selectedTransformCard].image}
                  title={transformCards[selectedTransformCard].title}
                  description={transformCards[selectedTransformCard].description}
                />
              {/if}
            </Item>
            {#each selectedGems as i}
              <Item>
                <GemCard
                  selectable={false}
                  selected={true}
                  image={gems[i].image}
                  gemstone={gems[i].gemstone}
                  rarity={gems[i].rarity}
                />
              </Item>
            {/each}
          </Carousel>
        {/if}
      </div>
    {/key}

    <div class="next-btn">
      {#if progress === 0}
        <Button disabled={selectedTransformCard === undefined} on:click={() => progress++}
          >{$i18n.t('transformGems_next_button')}</Button
        >
      {/if}

      {#if progress === 1}
        <Button disabled={selectedGems.length < 2} on:click={() => progress++}
          >{$i18n.t('transformGems_next_button')}</Button
        >
      {/if}

      {#if progress === 2}
        <Button on:click={() => dispatch('complete')}
          >{$i18n.t('transformGems_complete_button')}</Button
        >
      {/if}
    </div>
  </div>
</ProgressCard>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }
  .container {
    display: grid;
    grid-area: 2 / 1;
  }

  .title {
    grid-area: 1 / 1;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: end;
  }

  .content {
    display: grid;
    grid-template-rows: 10% auto 20%;
  }

  .next-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
