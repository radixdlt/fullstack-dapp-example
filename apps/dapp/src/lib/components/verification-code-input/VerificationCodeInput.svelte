<script lang="ts">
  let digits = 6

  export let error = false
  export let values: string[] = Array(digits).fill('')

  let inputs: HTMLElement[] = Array(digits)

  const focusNext = (i: number) => inputs[i + 1].focus()

  const focusPrevious = (i: number) => inputs[i - 1].focus()

  const onKeydown =
    (i: number) =>
    (
      e: KeyboardEvent & {
        currentTarget: EventTarget & HTMLInputElement
      }
    ) => {
      if (e.currentTarget.value !== '' && e.key.match(/[0-9]/)) {
        values[i] = ''
      }
      if (e.key === 'Backspace' && i !== 0) {
        if (values[i] === '') {
          focusPrevious(i)
        } else {
          values[i] = ''
        }
      }
      if (e.key === 'ArrowRight') {
        focusNext(i)
      }
      if (e.key === 'ArrowLeft') {
        focusPrevious(i)
      }
    }

  const onInput =
    (i: number) =>
    (
      e: Event & {
        currentTarget: EventTarget & HTMLInputElement
      }
    ) => {
      if (!e.currentTarget.value.match(/[0-9]/)) {
        values[i] = ''
        return
      }
      if (values[i] !== '') {
        values[i] = e.currentTarget.value
      }
      if (i !== digits - 1) focusNext(i)
    }
</script>

<div class="verification-code-input">
  {#each values as _, i}
    <div class="digit-box" class:error>
      <input
        bind:this={inputs[i]}
        maxlength="1"
        bind:value={values[i]}
        on:input={onInput(i)}
        on:keydown={onKeydown(i)}
      />
    </div>
  {/each}
</div>

<style lang="scss">
  .verification-code-input {
    display: flex;
    gap: var(--spacing-md);
  }

  .digit-box {
    height: 3.75rem;
    aspect-ratio: 1 / 1.6;
    border: var(--border-lg) var(--color-neutral);
    border-radius: var(--border-radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;

    input {
      width: 1rem;
      text-align: center;
    }
  }

  .error {
    border-color: var(--color-error);
  }
</style>
