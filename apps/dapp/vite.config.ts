import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { virtualGlossary } from './src/vite-plugins/virtualGlossary'

export default defineConfig({
	plugins: [sveltekit(), virtualGlossary()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
