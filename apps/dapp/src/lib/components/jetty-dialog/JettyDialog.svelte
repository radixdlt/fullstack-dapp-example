<script lang="ts">
  import { flip } from 'svelte/animate'
  import JettyIcon from './JettyIcon.svelte'
  import SpeechBubble from './speech-bubble/SpeechBubble.svelte'
  import { sineInOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'
  import Backdrop from '../backdrop/Backdrop.svelte'

  export let dialogs: number
  export let currentDialog = 0

  export const setCurrentDialog = (index: number) => {
    currentDialog = index
  }

  export const nextDialog = () => {
    currentDialog++
  }
</script>

<Backdrop>
  <div class="jetty-dialog">
    {#each Array(dialogs) as _, i (i)}
      <div
        in:scale|global={{ delay: 250 }}
        out:scale|global
        animate:flip={{ delay: 250, duration: 250, easing: sineInOut }}
      >
        <SpeechBubble let:Menu let:Actions>
          <slot {i} {Menu} {Actions} />
        </SpeechBubble>
      </div>
    {/each}
    <div>
      <JettyIcon />
    </div>
  </div>
</Backdrop>

<style lang="scss">
  .jetty-dialog {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;

    > * {
      align-self: flex-end;
    }
  }
</style>
