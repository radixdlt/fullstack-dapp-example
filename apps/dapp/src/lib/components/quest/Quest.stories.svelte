<script lang="ts" context="module">
	export const meta = {
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'The title of the quest'
			},
			description: {
				control: 'text',
				description: 'The description of the quest'
			},
			rewards: {
				control: 'number',
				description: 'Amount of rewards to be displayed'
			}
		}
	}
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf'
	import Quest from './Quest.svelte'
	import XRDIcon from '@images/xrd.png'
	import FragmentIcon from '@images/fragment.png'
	import BigNumber from 'bignumber.js'
	import PurpleCardIcon from '@images/purple-card.svg'

	const rewards = {
		XRD: {
			icon: XRDIcon,
			amount: new BigNumber(10)
		},
		Fragment: {
			icon: FragmentIcon,
			amount: new BigNumber(100)
		},
		'Purple Card': {
			icon: PurpleCardIcon,
			amount: new BigNumber(1)
		}
	}

	const getRewardData = (count: number) =>
		Array(count)
			.fill(undefined)
			.map((_, i) => {
				return rewards[
					Object.keys(rewards)[i % Object.keys(rewards).length] as keyof typeof rewards
				]
			})
</script>

<Template let:args>
	<div class="container">
		<Quest title={args.title} steps={3} let:Intro let:Header let:Paragraph let:progress>
			{#if progress === 0}
				<Intro
					title={args.title}
					description={args.description}
					minutesToComplete={10}
					rewards={getRewardData(args.rewards)}
					minutesSingular="minute"
					minutesPlural="minutes"
				/>
			{/if}

			{#if progress === 1}
				<Header>What can the Radar wallet do?</Header>
				<Paragraph
					>The Radar Wallet is a mobile app that securely holds your web3 assets and identities on
					the Radar Network (but not other networks e.g. Ethereum). You can use your wallet to log
					into dApps on the Radar Network and approve web3 transactions using your digital assets.</Paragraph
				>
			{/if}

			{#if progress === 2}
				<Header>Use Your Wallet to log in to any web3 apps on the Radar network</Header>
				<Paragraph
					>Let's make it web3 official! It's time to use your wallet to formally log in to RadQuest.
					Did you know? We call web3 apps like RadQuest, dApps.</Paragraph
				>
				<Header>What are dApps?</Header>
				<Paragraph>
					You've got the facts so now its time to take action! Once again this quest will
					temporarily take you away from the RadQuest App. Follow the steps on the next page and be
					sure to come straight back to claim your reward for completing your quest!
				</Paragraph>
				<Paragraph>
					You've got the facts so now its time to take action! Once again this quest will
					temporarily take you away from the RadQuest App. Follow the steps on the next page and be
					sure to come straight back to claim your reward for completing your quest!
				</Paragraph>
				<Paragraph>
					You've got the facts so now its time to take action! Once again this quest will
					temporarily take you away from the RadQuest App. Follow the steps on the next page and be
					sure to come straight back to claim your reward for completing your quest!
				</Paragraph>
			{/if}
		</Quest>
	</div>
</Template>

<Story
	name="Primary"
	args={{
		title: 'Your first transaction on Radar',
		description: 'Get familiar with Radar, the radically better Web3 network.'
	}}
/>

<style>
	.container {
		height: 50vh;
		width: 50vw;
	}
</style>
