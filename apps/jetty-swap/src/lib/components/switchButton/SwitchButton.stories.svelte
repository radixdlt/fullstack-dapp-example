<script lang="ts" context="module">
  export const meta = {
    component: SwitchButton,
    tags: ['autodocs']
  }
</script>

<script lang="ts">
  import SwitchButton from './SwitchButton.svelte'
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import ArrowIcon from '../../../images/arrow-down.svg'
  import Icon from '../icon/Icon.svelte'
</script>

<Template let:args>
  <SwitchButton on:click {...args}>
    <Icon --size="20px" url={ArrowIcon} />
  </SwitchButton>
</Template>

<Story name="Primary" />
