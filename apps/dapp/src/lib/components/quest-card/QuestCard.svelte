<script lang="ts">
	export let title: string
	export let subtitle: string
	export let description: string
</script>

<div class="card quest-card">
	<div class="text-content">
		<h3>
			{title}
		</h3>
		<p class="text-label">
			{subtitle}
		</p>
		<p class="text-extra-light description">
			{description}
		</p>
	</div>
</div>

<style lang="scss">
	.quest-card {
		display: flex;
		flex-direction: column;
		width: 21.5rem;
		height: 35.3rem;
		justify-content: flex-end;
	}

	.text-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-lg);
		text-align: center;
	}

	.description {
		opacity: 0.7;
	}
</style>
