<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import LightbulbOutline from './lightbulb_outline.svg'

  const formId = crypto.randomUUID()

  type Answer = { text: string; correct: boolean; info: string }

  export let answers: Answer[] = []
  export let correctAnswerSelected = false

  onMount(() => {
    if (correctAnswerSelected) {
      selectedAnswer = answers.find((answer) => answer.correct)!
    }
  })

  let correctAnswers = []
  let selectedAnswer: Answer

  const dispatch = createEventDispatcher<{ correctAnswer: boolean }>()

  const onChange = (event: Event, answer: Answer) => {
    const selectedValue = Number((event.currentTarget as HTMLInputElement)?.value)
    selectedAnswer = answer
    if (answers[selectedValue].correct) {
      correctAnswers.push(answers[selectedValue])
      if (correctAnswers.length === answers.filter((answer) => answer.correct).length) {
        dispatch('correctAnswer', true)
      }
    }
  }
</script>

<div class:correct-answer={correctAnswerSelected}>
  {#each answers as answer, index}
    <label>
      <input
        type="radio"
        name={formId}
        on:change={(ev) => onChange(ev, answer)}
        value={index}
        checked={correctAnswerSelected && answer.correct}
        class:correct={answer.correct && selectedAnswer === answer}
        class:incorrect={!answer.correct && selectedAnswer === answer}
      />
      <span class:incorrect-answer={!answer.correct && selectedAnswer === answer}
        >{@html answer.text}</span
      >
    </label>
  {/each}
</div>
{#if selectedAnswer}
  <hr />

  <span class="info">
    <img src={LightbulbOutline} alt="Lightbulb icon" />
    {selectedAnswer.info}
  </span>
{/if}

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .incorrect-answer {
    text-decoration: line-through;
  }

  label {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-lg);
    cursor: pointer;

    :global(p) {
      margin: 0;
    }
  }

  .info {
    font-style: italic;
  }

  hr {
    height: 1px;
    border: none;
    background: #fff;
    margin-top: var(--spacing-2xl);
  }

  input {
    cursor: pointer;
    display: grid;
    place-content: center;
    width: 1rem;
    min-width: 1rem;
    height: 1rem;
    border: 0.15rem solid currentColor;
    border-radius: 0.2rem;
    margin-top: 0.3rem;
    transition: border-color 150ms ease-in-out;

    &.correct {
      border-color: var(--color-primary);
    }

    &.incorrect {
      border-color: var(--color-error);
    }
  }

  input::before {
    content: '';
    width: 1rem;
    height: 1rem;
    transform: scale(0);
    transition: 150ms transform ease-in-out;
  }

  input.correct::before {
    background:
      center / 75% no-repeat url('@images/checkbox-checkmark.svg'),
      var(--color-primary);
  }

  input.incorrect::before {
    background:
      center / 100% no-repeat url('@images/cross-white.svg'),
      var(--color-error);
  }

  input:checked::before {
    transform: scale(1);
  }
</style>
