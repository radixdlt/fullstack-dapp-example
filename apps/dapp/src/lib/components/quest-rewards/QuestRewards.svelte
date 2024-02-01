<script lang="ts">
	import type BigNumber from 'bignumber.js'
	import Icon from '../icon/Icon.svelte'

	export let rewards: {
		icon: string
		amount: BigNumber
	}[] = []
</script>

<div class="rewards">
	{#each rewards as { icon, amount }}
		<div>
			<Icon url={icon} size="small">
				{amount.toString()}
			</Icon>
		</div>
	{/each}
</div>

<style lang="scss">
	.rewards {
		flex-flow: row-reverse;
		flex-wrap: wrap;
		display: flex;
		align-items: center;
		gap: var(--spacing-xl);
	}
</style>
