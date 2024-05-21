<script lang="ts">
  import JettyActionButtons from '$lib/components/quest/JettyActionButtons.svelte'
  import Quiz from '$lib/components/quiz/Quiz.svelte'
  import { completeRequirement } from '$lib/helpers/complete-requirement.svelte'
  import type { QuestId } from 'content'

  import Error from '$lib/components/error/Error.svelte'
  import { i18n } from '$lib/i18n/i18n'

  export let text: string
  export let onBack: () => void
  export let onNext: () => void
  export let answers: { text: string; correct: boolean }[] = []

  export let quizRequirement: string
  export let questId: QuestId
  export let requirements: { [key: string]: boolean }

  let isCorrectAnswer = requirements[quizRequirement]
  let error = false

  const handleCorrectAnswer = () => {
    completeRequirement(questId, quizRequirement)
      .map(() => {
        isCorrectAnswer = true
      })
      .mapErr(() => {
        error = true
      })
  }
</script>

{@html text}

<Quiz {answers} on:correctAnswer={handleCorrectAnswer} correctAnswerSelected={isCorrectAnswer} />

{#if error}
  <Error>{$i18n.t('quests:somethingWentWrong')}</Error>
{/if}

<JettyActionButtons isNextDisabled={!isCorrectAnswer} on:back={onBack} on:next={onNext} />
