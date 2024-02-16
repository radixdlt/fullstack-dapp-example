<script lang="ts" context="module">
  export const meta = {
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import JettyDialog from './JettyDialog.svelte'
  import LightningIcon from '@images/lightning-icon.svg'
  import BookIcon from '@images/book-open.svg'
  import MinimizeIcon from '@images/minimize.svg'
  import Button from '../button/Button.svelte'

  let show = true

  const toggle = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const toggle = canvasElement.getElementsByTagName('button')[0]

    await toggle.click()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await toggle.click()
  }
</script>

<Template let:args>
  <div class="container">
    {#if show}
      <JettyDialog {...args} let:i let:Menu let:Actions>
        {#if i === 0}
          Hey, I'm Jetty! I'm here to help you get started with the Radar network.
        {/if}

        {#if i === 1}
          I'll be your guide throughout this journey. Let's get started!
        {/if}

        {#if i === 2}
          You can always find me in the bottom right corner of the screen.
        {/if}

        {#if i === 3}
          <Menu
            options={[
              {
                text: 'Fuse Pebbles',
                iconUrl: LightningIcon,
                onClick: () => console.log('Option 1 clicked')
              },
              {
                text: 'Transform Gemstones',
                iconUrl: MinimizeIcon,
                onClick: () => console.log('Option 2 clicked')
              },
              {
                text: 'Glossary',
                iconUrl: BookIcon,
                onClick: () => console.log('Option 3 clicked')
              }
            ]}
          />
        {/if}

        {#if i === 4}
          <p>You have 90 Elements right now.</p>
          <p>Send me 10 Elements and I will create a random gemstone.</p>

          <Actions
            actions={[
              {
                text: 'Send Jetty 10 Elements',
                onClick: () => console.log('Option 1 clicked')
              }
            ]}
          />
        {/if}
      </JettyDialog>
    {/if}
  </div>

  <Button on:click={() => (show = !show)}>Toggle</Button>
</Template>

<Story
  name="Primary"
  args={{
    dialogs: 2
  }}
/>

<Story name="Test:Toggle" play={toggle} />

<style>
  .container {
    width: 50rem;
    height: 50rem;
  }
</style>
