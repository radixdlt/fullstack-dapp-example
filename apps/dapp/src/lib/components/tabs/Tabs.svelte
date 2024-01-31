<script lang="ts">
	import { crossfade } from 'svelte/transition'

	export let tabs: string[] = []

	export const setActiveTab = (tab: string) => {
		activeTab = tab
	}

	const [send, receive] = crossfade({
		duration: 300
	})

	let activeTab: string = tabs[0].toLowerCase()

	$: activeTabLowerCase = activeTab.toLowerCase()
</script>

<div class="tabs">
	{#each tabs as tab}
		<div class="tab-container">
			<div class="tab">
				<button
					class:active={activeTabLowerCase === tab.toLowerCase()}
					class:inactive={activeTabLowerCase !== tab.toLowerCase()}
					on:click={() => (activeTab = tab.toLowerCase())}
				>
					{tab}
				</button>
				{#if activeTabLowerCase === tab.toLowerCase()}
					<div class="underline" out:send={{ key: 1 }} in:receive={{ key: 1 }} />
				{/if}
			</div>
		</div>
	{/each}
</div>

<slot {activeTab} />

<style lang="scss">
	.tabs {
		display: flex;
		gap: var(--spacing-2xl);
	}

	.tab-container {
		width: 5rem;
		display: flex;
		justify-content: center;
	}

	.tab {
		display: flex;
		flex-direction: column;
		width: fit-content;
		font-weight: var(--font-weight-bold);
	}

	.active {
		color: var(--color-dark);
	}

	.inactive {
		opacity: 0.4;
		transition: opacity 0.4s ease-in-out;
	}

	.underline {
		width: 100%;
		height: 0.1rem;
		background: var(--color-dark);
		border-radius: var(--border-radius-md);
	}

	.tabs-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
</style>
