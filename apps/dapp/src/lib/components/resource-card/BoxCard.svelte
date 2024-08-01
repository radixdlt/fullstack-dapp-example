<script lang="ts">
  import ResourceCard from './ResourceCard.svelte'

  export let name: string
  export let image: string
  export let selected: boolean
</script>

<ResourceCard selectable {selected} on:selected>
  <img class="gift-box" src={image} alt="A Gift Box" />

  <div class="text" slot="text">
    {name}
  </div>
</ResourceCard>

<style lang="scss">
  .gift-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13rem;
    height: 13rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius-xl);
  }

  .text {
    font-weight: var(--font-weight-bold);
  }
</style>
