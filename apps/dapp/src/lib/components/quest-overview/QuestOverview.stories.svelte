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
			minutesToComplete: {
				control: 'number',
				description: 'The number of minutes to complete the quest'
			},
			state: {
				control: 'select',
				options: ['unlocked', 'locked', 'completed'],
				description: 'The state of the quest'
			},
			background: {
				control: 'boolean',
				description: 'Whether the quest has a background or not'
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
	import QuestOverview from './QuestOverview.svelte'
	import JettyPlatform from '@images/jetty-platform.png'
	import FragmentIcon from '@images/fragment.png'
	import XRDIcon from '@images/xrd.png'
	import PurpleCardIcon from '@images/purple-card.svg'
	import BigNumber from 'bignumber.js'

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
	<div style:height="40rem">
		<QuestOverview
			title={args.title}
			description={args.description}
			minutesToComplete={args.minutesToComplete}
			state={args.state}
			backgroundImage={args.background ? JettyPlatform : ''}
			rewards={getRewardData(args.rewards)}
		/>
	</div>
</Template>

<Story
	name="Primary"
	args={{
		title: 'Introduction to Radar',
		minutesToComplete: 1,
		description: 'Get familiar with Radar, the radically better Web3 network.',
		state: 'unlocked',
		background: false,
		rewards: 0
	}}
/>

<Story name="Small">
	<div style:height="30rem">
		<QuestOverview
			title="Introduction to Radar"
			description="Get familiar with Radar, the radically better Web3 network."
			minutesToComplete={1}
			state="unlocked"
			backgroundImage={JettyPlatform}
			rewards={getRewardData(3)}
		/>
	</div>
</Story>
