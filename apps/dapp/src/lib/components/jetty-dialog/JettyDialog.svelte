<script lang="ts">
  import { flip } from 'svelte/animate'
  import JettyIcon from './JettyIcon.svelte'
  import SpeechBubble from './speech-bubble/SpeechBubble.svelte'
  import { sineInOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'

  export let dialogs = 1
  export let currentDialog = 0
  export let close = false

  export const setCurrentDialog = (index: number) => {
    currentDialog = index
  }

  export const nextDialog = () => {
    currentDialog++
  }
</script>

<div class="jetty-dialog">
  {#each Array(dialogs) as _, i (i)}
    <div
      in:scale|global={{ delay: 250 }}
      out:scale|global
      animate:flip={{ delay: 250, duration: 250, easing: sineInOut }}
    >
      <SpeechBubble let:Menu let:Actions let:ClaimRewards>
        <slot {i} {Menu} {Actions} {ClaimRewards} />
      </SpeechBubble>
    </div>
  {/each}
  <div>
    <JettyIcon on:click {close} />
  </div>
</div>

<style lang="scss">
  .jetty-dialog {
    position: fixed;
    bottom: 0.5rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column;
    z-index: 6;

    > * {
      align-self: flex-end;
    }
  }
</style>
