<script lang="ts" context="module">
  export const meta = {
    component: Carousel
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Carousel from './Carousel.svelte'
  import QuestOverviewCard from '../quest-overview/QuestOverview.svelte'
</script>

<Template>
  <div class="container">
    <Carousel let:Item>
      {#each Array(10) as _}
        <Item>
          <QuestOverviewCard
            title="Introduction to Radar"
            description="Get familiar with Radar, the radically better Web3 network."
            minutesToComplete={1}
          />
        </Item>
      {/each}
    </Carousel>
  </div>
</Template>

<Story name="Primary" />

<Story name="No Buttons">
  <div class="container">
    <Carousel noButtons let:Item>
      <Item>
        <QuestOverviewCard
          title="Introduction to Radar"
          description="Get familiar with Radar, the radically better Web3 network."
          minutesToComplete={1}
        />
      </Item>
    </Carousel>
  </div>
</Story>

<style lang="scss">
  .container {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
