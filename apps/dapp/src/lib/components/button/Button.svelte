<script lang="ts">
	export let disabled = false
	export let secondary = false
</script>

<button on:click class:disabled class:primary={!secondary} class:secondary>
	<slot />
</button>

<style lang="scss">
	button {
		cursor: pointer;
		display: flex;
		white-space: nowrap;
		padding: 0.7rem 1.5rem;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-lg);
		border-radius: var(--border-radius-xl);
		backdrop-filter: blur(10px);
		font-weight: var(--font-weight-bold);
		font-size: var(--text-xs);
		height: 2.7rem;
		min-width: 7rem;
	}

	.primary {
		background: var(--color-main);
		color: var(--color-light);
		border: var(--border) var(--color-main);

		&:hover {
			filter: brightness(0.8);
		}

		transition: filter 0.2s ease-in-out;
	}

	.secondary {
		background: var(--color-light);
		color: var(--color-dark);
		border: var(--border) var(--color-dark);

		&:hover {
			color: var(--color-light);
			background: var(--color-dark);
		}

		transition:
			color 0.2s ease-in-out,
			background 0.2s ease-in-out;
	}
</style>
