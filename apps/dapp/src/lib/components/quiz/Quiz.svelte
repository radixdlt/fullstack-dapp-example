<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let answers: { text: string; correct: boolean }[] = []
  export let correctAnswerSelected = false

  const dispatch = createEventDispatcher<{ correctAnswer: boolean }>()

  const onChange = (event: Event) => {
    const selectedValue = Number((event.currentTarget as HTMLInputElement)?.value)

    if (answers[selectedValue].correct) {
      dispatch('correctAnswer', true)
      correctAnswerSelected = true
    }
  }
</script>

<div class:correct-answer={correctAnswerSelected}>
  {#each answers as answer, index}
    <label>
      <input
        type="checkbox"
        on:change={onChange}
        value={index}
        checked={correctAnswerSelected && answer.correct}
        class:correct={answer.correct}
        class:incorrect={!answer.correct}
      />
      <span>{@html answer.text}</span>
    </label>
  {/each}
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  div.correct-answer {
    label,
    input {
      pointer-events: none;
    }
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

  input {
    cursor: pointer;
    display: grid;
    place-content: center;
    width: 1rem;
    min-width: 1rem;
    height: 1rem;
    border: 0.15rem solid currentColor;
    margin-top: 0.3rem;
  }

  input::before {
    content: '';
    width: 0.65rem;
    height: 0.65rem;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
  }

  input.correct::before {
    box-shadow: inset 1rem 1rem var(--color-primary);
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  input.incorrect::before {
    box-shadow: inset 1rem 1rem var(--color-error);
    clip-path: polygon(
      20% 0%,
      0% 20%,
      30% 50%,
      0% 80%,
      20% 100%,
      50% 70%,
      80% 100%,
      100% 80%,
      70% 50%,
      100% 20%,
      80% 0%,
      50% 30%
    );
  }

  input:checked::before {
    transform: scale(1);
  }
</style>
