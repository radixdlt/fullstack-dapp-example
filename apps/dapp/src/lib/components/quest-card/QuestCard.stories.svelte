<script lang="ts" context="module">
	export const meta = {
		component: QuestCard,
		argTypes: {
			title: {
				control: 'text',
				description: 'The title of the quest'
			},
			subtitle: {
				control: 'text',
				description: 'The subtitle of the quest'
			},
			description: {
				control: 'text',
				description: 'The description of the quest'
			}
		}
	}
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf'

	import QuestCard from './QuestCard.svelte'
</script>

<Template let:args>
	<QuestCard {...args} />
</Template>

<Story
	name="Primary"
	args={{
		title: 'Introduction to Radar',
		subtitle: 'QUEST • 1 MIN',
		description: 'Get familiar with Radar, the radically better Web3 network.'
	}}
/>
