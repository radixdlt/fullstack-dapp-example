<script lang="ts">
  import JettyIcon from './JettyIcon.svelte'
  import SpeechBubble from './speech-bubble/SpeechBubble.svelte'

  export let dialogs = 1
  export let currentDialog = 0
  export let close = false
  export let notification = false

  export const setCurrentDialog = (index: number) => {
    currentDialog = index
  }

  export const nextDialog = () => {
    currentDialog++
  }
</script>

<div class="jetty-dialog">
  {#each Array(dialogs) as _, i (i)}
    <slot {i} {SpeechBubble} />
  {/each}
  <div>
    <JettyIcon on:click {close} {notification} />
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
