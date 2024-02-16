<script lang="ts" context="module">
  import { Story } from '@storybook/addon-svelte-csf'
  import TransformGems from './TransformGems.svelte'
  import Background from '@images/transform-card-background.svg'
  import Gem from '@images/seperate_stone.png'
  import { fireEvent, getByText } from '@storybook/testing-library'

  export const meta = {}
</script>

<script lang="ts">
  const transformCards = [
    {
      title: 'Card 1',
      description: 'Description',
      image: Background
    },
    {
      title: 'Card 2',
      description: 'Description',
      image: Background
    },
    {
      title: 'Card 3',
      description: 'Description',
      image: Background
    },
    {
      title: 'Card 4',
      description: 'Description',
      image: Background
    },
    {
      title: 'Card 5',
      description: 'Description',
      image: Background
    },
    {
      title: 'Card 6',
      description: 'Description',
      image: Background
    }
  ]

  const gems = [
    {
      gemstone: 'Gem 1',
      rarity: 'Rarity 1',
      image: Gem
    },
    {
      gemstone: 'Gem 2',
      rarity: 'Rarity 2',
      image: Gem
    },
    {
      gemstone: 'Gem 3',
      rarity: 'Rarity 1',
      image: Gem
    },
    {
      gemstone: 'Gem 4',
      rarity: 'Rarity 2',
      image: Gem
    }
  ]

  const selectCards = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const carousel = canvasElement.getElementsByClassName('carousel')[0]

    await new Promise((resolve) => setTimeout(resolve, 200))

    fireEvent.scroll(carousel, {
      target: { scrollLeft: 400 }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const card = getByText(canvasElement, 'Card 3')
    const next = getByText(canvasElement, 'Next')

    card.click()
    next.click()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const carousel2 = canvasElement.getElementsByClassName('carousel')[0]

    const gem1 = getByText(canvasElement, 'Gem 1')
    gem1.click()

    fireEvent.scroll(carousel2, {
      target: { scrollLeft: 400 }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const gem3 = getByText(canvasElement, 'Gem 3')
    gem3.click()

    const next2 = getByText(canvasElement, 'Next')

    next2.click()
  }
</script>

<Story name="Primary">
  <div class="big">
    <TransformGems {transformCards} {gems} on:complete />
  </div>
</Story>

<Story name="Small">
  <div class="small">
    <TransformGems {transformCards} {gems} on:complete />
  </div>
</Story>

<Story name="Test:SelectCards" play={selectCards}>
  <div class="small">
    <TransformGems {transformCards} {gems} on:complete />
  </div>
</Story>

<style>
  .big {
    width: 40rem;
    height: 64rem;
  }
  .small {
    width: 20rem;
    height: 32rem;
  }
</style>
