<script lang="ts">
  import type { LayoutData } from '../$types'
  import Quest from '../Quest.svelte'

  export let data: LayoutData
</script>

<Quest
  {...data.questProps}
  steps={[
    {
      id: 'intro1',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'intro2',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    },
    {
      id: 'intro3',
      type: 'regular',
      footer: {
        type: 'navigation'
      }
    }
  ]}
  let:render
>
  {#if render('intro1')}
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum
    et, eleifend nunc. Pellentesque sed libero nec nulla tincidunt luctus. Nulla facilisi. Sed ut
    risus nec nunc tincidunt aliquam. Nulla facilisi. Sed ut risus nec nunc tincidunt aliquam.
  {/if}

  {#if render('intro2')}
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum
    et, eleifend nunc. Pellentesque sed libero nec nulla tincidunt luctus. Nulla facilisi. Sed ut
    risus nec nunc tincidunt aliquam. Nulla facilisi. Sed ut risus nec nunc tincidunt aliquam.
  {/if}

  {#if render('intro3')}
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum
    et, eleifend nunc. Pellentesque sed libero nec nulla tincidunt luctus. Nulla facilisi. Sed ut
    risus nec nunc tincidunt aliquam. Nulla facilisi. Sed ut risus nec nunc tincidunt aliquam.
  {/if}
</Quest>
