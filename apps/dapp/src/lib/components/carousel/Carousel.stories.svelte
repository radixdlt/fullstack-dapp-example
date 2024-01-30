<script lang="ts" context="module">
	export const meta = {
		component: Carousel
	}
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf'
	import Carousel from './Carousel.svelte'
	import QuestOverviewCard from '../quest-overview/QuestOverview.svelte'
	import { fireEvent } from '@storybook/testing-library'
	import { expect } from '@storybook/jest'

	const scroll = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const carousel = canvasElement.getElementsByClassName('carousel')[0]
		const items = canvasElement.getElementsByClassName('item')

		expect(items[0]).not.toHaveClass('disabled')

		await fireEvent.scroll(carousel, {
			target: { scrollLeft: 2000 }
		})

		// wait for scroll to finish
		await new Promise((resolve) => setTimeout(resolve, 1000))

		expect(items[0]).toHaveClass('disabled')
	}
</script>

<Template>
	<div class="container">
		<Carousel let:Item>
			{#each Array(10) as _}
				<Item>
					<QuestOverviewCard
						title="Introduction to Radar"
						description="Get familiar with Radar, the radically better Web3 network."
						minutesToComplete={1}
						minutesSingular="minute"
						minutesPlural="minutes"
					/>
				</Item>
			{/each}
		</Carousel>
	</div>
</Template>

<Story name="Primary" />

<Story name="Test:scroll" play={scroll} />

<style lang="scss">
	.container {
		height: 80vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
