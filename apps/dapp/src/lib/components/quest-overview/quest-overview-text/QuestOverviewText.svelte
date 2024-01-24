<script lang="ts">
	import ClockIcon from '@images/clock.svg'
	export let title: string
	export let description: string
	export let minutesToComplete: number
</script>

<div class="text-content">
	<h3 class="title">
		{title}
	</h3>
	<div class="icon-and-label">
		<img src={ClockIcon} alt="Clock icon" />
		<p class="text-label">
			{minutesToComplete}
			{minutesToComplete === 1 ? 'minute' : 'minutes'}
		</p>
	</div>
	<p class="text-extra-light description">
		{description}
	</p>
</div>

<style lang="scss">
	.text-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-lg);
		text-align: center;
		overflow: hidden;
	}

	.title {
		max-height: 15rem;
		overflow: hidden;
	}

	.description {
		opacity: 0.5;
		overflow: hidden;
		max-height: 5rem;
	}

	.icon-and-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}
</style>
