import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { virtualGlossary } from './src/vite-plugins/virtualGlossary'
import { virtualQuests } from './src/vite-plugins/virtualQuests'

export default defineConfig({
  plugins: [sveltekit(), virtualGlossary(), virtualQuests()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'src/mixins' as *;
        `
      }
    }
  }
})
