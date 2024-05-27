<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Quiz from './Quiz.svelte'
  export const meta = {
    tags: ['autodocs']
  }
</script>

<Template let:args>
  <div style:height="40rem">
    <Quiz
      answers={args.answers}
      on:correctAnswer={() => console.log('correct answer selected')}
      correctAnswerSelected={args.correctAnswerSelected}
    />
  </div>
</Template>

<Story
  name="Primary"
  args={{
    answers: [
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
    ]
  }}
/>

<Story
  name="Correct answer selected"
  args={{
    correctAnswerSelected: true,
    answers: [
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
    ]
  }}
/>
