<script lang="ts">
	export let disabled = false
	export let secondary = false
</script>

<button on:click class:disabled class:secondary>
	<slot />
</button>

<style lang="scss">
	button {
		cursor: pointer;
		background: var(--color-primary);
		color: var(--color-light);
		display: flex;
		padding: 0.7rem 3.7rem;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-lg);
		border-radius: var(--border-radius-xl);
		backdrop-filter: blur(10px);
		font-weight: var(--font-weight-bold);
		font-size: var(--text-xs);
		height: 2.7rem;
	}

	.secondary {
		background: var(--color-light);
		color: var(--color-dark);
		border: var(--border) var(--color-dark);
	}
</style>
