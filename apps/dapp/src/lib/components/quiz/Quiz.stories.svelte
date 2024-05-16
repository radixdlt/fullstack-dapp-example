<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Quiz from './Quiz.svelte'
  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template>
  <div style="padding: 1rem">
    <Quiz
      answers={[
        {
          text: 'the collective noun for 2000-tentacled giant squids',
          correct: false
        },
        {
          text: 'the scientific name for the hive of the mythical Radon Bumblebee.',
          correct: false
        },
        {
          text: 'a decentralized ecosystem of networked computer nodes designed to make accessing Web3 easier for developers and users.',
          correct: true
        }
      ]}
      on:correctAnswer={() => console.log('correct answer selected')}
    />
  </div>
</Template>

<Story name="Primary" />
