<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	let item: HTMLElement

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					item.classList.remove('disabled')
				} else {
					item.classList.add('disabled')
				}
			})
		},
		{
			root: null,
			threshold: 0.95
		}
	)

	onMount(() => {
		observer.observe(item)
	})

	onDestroy(() => {
		observer.disconnect()
	})
</script>

<div class="item" bind:this={item}>
	<slot />
</div>

<style>
	.item {
		scroll-snap-align: center;
	}

	.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
