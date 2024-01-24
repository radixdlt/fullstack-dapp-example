<script lang="ts">
	import type { BigNumber } from 'bignumber.js'
	import QuestRewards from '../quest-rewards/QuestRewards.svelte'
	import QuestOverviewText from './quest-overview-text/QuestOverviewText.svelte'
	import Button from '../button/Button.svelte'
	import PadlockIcon from '@images/padlock.svg'
	import CheckmarkIcon from '@images/checkmark.svg'

	export let title: string
	export let description: string
	export let minutesToComplete: number
	export let state: 'locked' | 'unlocked' | 'completed' = 'locked'
	export let backgroundImage: string | undefined = undefined
	export let rewards: {
		icon: string
		amount: BigNumber
	}[] = []
</script>

<div
	class="card quest-card"
	style:--background-image={backgroundImage ? `url(${backgroundImage})` : ''}
>
	<div class="content">
		<QuestOverviewText {title} {description} {minutesToComplete} />

		<div class="start-button">
			<Button disabled={state === 'locked'}>
				<div class="button-content">
					{#if state === 'unlocked'}
						Start
					{:else if state === 'locked'}
						<img src={PadlockIcon} alt="Padlock icon" />
					{:else}
						<img src={CheckmarkIcon} alt="Checkmark icon" />
					{/if}
				</div>
			</Button>
		</div>
	</div>

	{#if rewards}
		<div class="rewards">
			<QuestRewards {rewards} />
		</div>
	{/if}
</div>

<style lang="scss">
	.quest-card {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 21.5rem;
		height: 100%;
		max-height: 35.3rem;
		min-height: 32rem;
		justify-content: flex-end;
		background: var(--color-light);
		background-image: linear-gradient(transparent 30%, var(--color-light) 50%),
			var(--background-image), var(--gradient-5);
		background-position-y: 3.5rem;

		@media (max-width: 25rem) {
			width: 84vw;
		}

		margin: 0 0.5rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.start-button {
		margin-top: var(--spacing-lg);
	}

	.rewards {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
	}

	.button-content {
		display: flex;
		justify-content: center;
		width: 2.3rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.start-button {
		margin-top: var(--spacing-lg);
	}

	.button-content {
		display: flex;
		justify-content: center;
		width: 2.3rem;
	}
</style>
