<script lang="ts" context="module">
  type Action = {
    text?: string
    onClick?: () => void
    enabled?: Writable<boolean> | Readable<boolean>
  }

  type _Step<T extends string> = {
    id: string
    type: T
    skip?: Writable<boolean> | Readable<boolean>
  }

  type IntroStep = _Step<'intro'> & { id: 'intro' }

  type RequirementStep = _Step<'requirements'> & { id: 'requirements' }

  type ClaimRewardsStep = _Step<'claimRewards'> & { id: 'claimRewards' }

  type CompleteStep = _Step<'complete'> & { id: 'complete' }

  type RegularStep = _Step<'regular'> & {
    footer?: {
      next?: Action
      back?: Omit<Action, 'enabled'>
    }
  }

  type JettyStep = _Step<'jetty'> & {
    dialogs: number
    next?: Omit<Action, 'enabled'>
    back?: Omit<Action, 'enabled'>
  }
</script>

<script lang="ts">
  import type { QuestReward } from 'content'
  import QuestCard from './QuestCard.svelte'
  import Intro from './Intro.svelte'
  import JettyDialog from '../jetty-dialog/JettyDialog.svelte'
  import JettyActionButton from './JettyActionButton.svelte'
  import JettyActionButtons from './JettyActionButtons.svelte'
  import { createEventDispatcher } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { Readable, Unsubscriber } from 'svelte/motion'

  export let title: string
  export let description: string
  export let minutesToComplete: number
  export let rewards: Readonly<QuestReward[]>
  export let steps: (
    | RegularStep
    | JettyStep
    | Omit<RequirementStep, 'id'>
    | Omit<ClaimRewardsStep, 'id'>
    | Omit<CompleteStep, 'id'>
  )[]
  export let requirements: {
    text: string
    complete: boolean
  }[] = []
  export let nextDisabled = false
  export let startAtProgress: number | string = 0

  export const setProgress = async (_progress: number) => {
    if (_progress < 0 || _progress >= _steps.length) return

    const step = _steps[_progress]

    let unsubscribe: Unsubscriber = () => {}

    const skipPromise = new Promise<boolean>((resolve) => {
      if (step.skip) {
        unsubscribe = step.skip.subscribe((value) => {
          resolve(value)
        })
      } else {
        resolve(false)
      }
    })

    const skip = await skipPromise

    unsubscribe()

    if (skip) {
      setProgress(progress < _progress ? _progress + 1 : _progress - 1)
    } else {
      lastProgress = progress
      progress = _progress
      dispatch('progressUpdated', progress)
    }
  }

  export const goToStep = (id: string) => {
    const index = _steps.findIndex((step) => step.id === id)
    if (index < 0) return
    setProgress(index)
  }

  export const next = () => setProgress(progress + 1)
  export const back = () => setProgress(progress - 1)

  export let render: (id: string) => boolean = () => false

  const dispatch = createEventDispatcher<{
    progressUpdated: number
  }>()

  let progress = 0

  let questCardProgress = 0

  const introStep: IntroStep = {
    id: 'intro',
    type: 'intro'
  }

  let _steps: (IntroStep | RegularStep | JettyStep)[] = [introStep, ...steps].map((step) => {
    if (step.type === 'requirements') {
      return {
        id: 'requirements',
        type: 'regular'
      }
    }

    if (step.type === 'claimRewards') {
      return {
        id: 'claimRewards',
        type: 'jetty',
        dialogs: 1
      }
    }

    if (step.type === 'complete') {
      return {
        id: 'complete',
        type: 'jetty',
        dialogs: 1
      }
    }

    return step
  })

  const getJettyDialogs = (i: number) => {
    const step = _steps[i]
    if (step.type === 'jetty') return step.dialogs
    return 0
  }

  const nextStepIsJetty = (i: number) => {
    const nextStep = _steps[i + 1]
    if (nextStep && nextStep.type === 'jetty') return true
    return false
  }

  let nonJettySteps = _steps.filter((step) => step.type !== 'jetty').length

  $: {
    let slice = _steps.slice(0, progress + 1)
    let recentNonJettyStep = slice.findLastIndex((step) => step.type === 'regular')

    questCardProgress =
      recentNonJettyStep === -1 ? 0 : slice.filter((step) => step.type !== 'jetty').length - 1
  }

  $: render = (id: string) => {
    const currentId = currentStep.id

    if (currentId === id) return true

    const index = _steps.findIndex((step) => step.id === id)

    if (index < 0) return false

    const thisStep = _steps[index]

    const stepsBetweenThisAndProgress = _steps.slice(index + 1, progress)

    if (
      (stepsBetweenThisAndProgress.length > 0 &&
        stepsBetweenThisAndProgress.every((step) => step.type === 'jetty') &&
        thisStep.type !== 'jetty' &&
        currentStep.type === 'jetty') ||
      (thisStep.type !== 'jetty' && nextStepIsJetty(index) && progress === index + 1)
    ) {
      return true
    }

    return false
  }

  let lastProgress: number

  if (typeof startAtProgress === 'number' && startAtProgress > 0) {
    setProgress(startAtProgress)
  } else if (typeof startAtProgress === 'string') {
    goToStep(startAtProgress)
  }

  $: currentStep = _steps[progress]

  $: currentStepEnabledStore =
    currentStep.type === 'regular' ? currentStep.footer?.next?.enabled : undefined

  $: currentStepIsJetty = currentStep.type === 'jetty'
</script>

<QuestCard
  bind:progress={questCardProgress}
  {title}
  steps={nonJettySteps}
  cardDisabled={currentStepIsJetty}
  on:close
  on:next={next}
  on:prev={back}
  nextOnClick={currentStep.type === 'regular' ? currentStep.footer?.next?.onClick ?? next : next}
  backOnClick={currentStep.type === 'regular' ? currentStep.footer?.back?.onClick ?? back : back}
  footerNextDisabled={nextDisabled || !($currentStepEnabledStore ?? true)}
  nextButtonText={currentStep.type === 'regular' ? currentStep.footer?.next?.text : undefined}
  backButtonText={currentStep.type === 'regular' ? currentStep.footer?.back?.text : undefined}
>
  {#if questCardProgress === 0}
    <Intro {title} {description} {minutesToComplete} {rewards} {requirements} on:next={next} />
  {/if}

  <slot {render} {next} {back} {lastProgress} {progress} />
</QuestCard>

{#if currentStep.type === 'jetty'}
  <JettyDialog dialogs={getJettyDialogs(progress)} let:i>
    <slot
      name="jetty"
      {render}
      dialog={i}
      Button={JettyActionButton}
      Buttons={JettyActionButtons}
      {next}
      {back}
    />
  </JettyDialog>
{/if}
