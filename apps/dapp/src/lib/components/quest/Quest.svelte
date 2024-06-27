<script lang="ts" context="module">
  export type FooterConfig = {
    next?: {
      text?: string
      onClick?: (next: () => void, loading: Writable<boolean>) => void
      enabled?: Writable<boolean> | Readable<boolean>
    }
    back?: {
      text?: string
      onClick?: () => void
    }
  }

  export type _Step<T extends string> = {
    id: string
    type: T
    skip?: Writable<boolean> | Readable<boolean>
  }

  export type IntroStep = _Step<'intro'> & { id: 'intro' }

  export type RegularStep = _Step<'regular'> & {
    footer?: FooterConfig
  }

  export type JettyStep = _Step<'jetty'> & {
    footer?: FooterConfig
  }
</script>

<script lang="ts">
  import type { QuestReward } from 'content'
  import QuestCard from './QuestCard.svelte'
  import Intro from './Intro.svelte'
  import { createEventDispatcher } from 'svelte'
  import { readable, type Writable } from 'svelte/store'
  import type { Readable, Unsubscriber } from 'svelte/motion'
  import JettyPage from './JettyPage.svelte'

  export let title: string
  export let description: string
  export let minutesToComplete: number
  export let rewards: Readonly<QuestReward[]>
  export let steps: (RegularStep | JettyStep)[]
  export let requirements: {
    text: string
    complete: boolean
  }[] = []
  export let nextDisabled = false
  export let startAtProgress: number | string = 0
  export let currentStep: IntroStep | RegularStep | JettyStep | undefined = undefined

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
  export const skip = () => setProgress(lastProgress < progress ? progress + 1 : progress - 1)

  export let render: (id: string) => boolean = () => false

  const dispatch = createEventDispatcher<{
    progressUpdated: number
    next: undefined
  }>()

  let progress = 0

  const introStep: IntroStep = {
    id: 'intro',
    type: 'intro'
  }

  let _steps: (IntroStep | RegularStep | JettyStep)[] = [introStep, ...steps]

  $: render = (id: string) => currentStep?.id === id

  let lastProgress: number

  if (typeof startAtProgress === 'number' && startAtProgress > 0) {
    setProgress(startAtProgress)
  } else if (typeof startAtProgress === 'string') {
    goToStep(startAtProgress)
  }

  $: currentStep = _steps[progress]

  let currentStepEnabledStore: Writable<boolean> | Readable<boolean> = readable(true)

  $: if (currentStep.type !== 'intro' && currentStep.footer?.next?.enabled) {
    currentStepEnabledStore = currentStep.footer.next.enabled
  } else {
    currentStepEnabledStore = readable(true)
  }
</script>

<QuestCard
  bind:progress
  {title}
  steps={_steps.length}
  on:close
  on:next={next}
  on:prev={back}
  nextOnClick={currentStep.type !== 'intro' ? currentStep.footer?.next?.onClick ?? next : next}
  backOnClick={currentStep.type !== 'intro' ? currentStep.footer?.back?.onClick ?? back : back}
  footerNextDisabled={nextDisabled || !$currentStepEnabledStore}
  nextButtonText={currentStep.type !== 'intro' ? currentStep.footer?.next?.text : undefined}
  backButtonText={currentStep.type !== 'intro' ? currentStep.footer?.back?.text : undefined}
>
  {#if currentStep.type === 'intro'}
    <Intro {title} {description} {minutesToComplete} {rewards} {requirements} on:next={next} />
  {/if}

  {#if currentStep.type === 'jetty'}
    <JettyPage animate={_steps[lastProgress].type !== 'jetty'}>
      <slot {render} {next} {back} {skip} {lastProgress} {progress} {currentStep} />
    </JettyPage>
  {:else}
    <slot {render} {next} {back} {skip} {lastProgress} {progress} {currentStep} />
  {/if}
</QuestCard>
