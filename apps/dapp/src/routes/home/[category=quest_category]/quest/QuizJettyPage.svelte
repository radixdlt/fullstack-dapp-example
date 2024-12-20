<script lang="ts">
  import Quiz from '$lib/components/quiz/Quiz.svelte'
  import { completeRequirement } from '$lib/helpers/complete-requirement.svelte'
  import type { QuestId } from 'content'

  import Error from '$lib/components/error/Error.svelte'
  import { i18n } from '$lib/i18n/i18n'
  import { useCookies, type RequirementCookieKey } from '$lib/utils/cookies'
  import type { QuestRequirement } from '$lib/server/user-quest/controller'
  import { createEventDispatcher, onMount } from 'svelte'

  export let text: string
  export let answers: { text: string; correct: boolean; info: string }[] = []

  export let quizRequirement: string
  export let questId: QuestId
  export let requirements: { [key: string]: QuestRequirement }

  $: cookieRequirementValue =
    useCookies(`requirement-${questId}-${quizRequirement}` as RequirementCookieKey).get() === 'true'
  $: isCorrectAnswer = requirements[quizRequirement]?.isComplete || cookieRequirementValue
  $: error = false

  const dispatch = createEventDispatcher<{ correct: undefined; mount: undefined }>()

  const handleCorrectAnswer = () => {
    if (isCorrectAnswer) return
    completeRequirement(questId, quizRequirement)
      .map(() => (isCorrectAnswer = true))
      .mapErr(() => {
        error = true
      })
  }

  let mounted = false

  onMount(() => {
    dispatch('mount')
    mounted = true
  })

  $: if (isCorrectAnswer && mounted) dispatch('correct')
</script>

{@html text}

<Quiz {answers} on:correctAnswer={handleCorrectAnswer} correctAnswerSelected={isCorrectAnswer} />

{#if error}
  <Error>{$i18n.t('quests:somethingWentWrong')}</Error>
{/if}
