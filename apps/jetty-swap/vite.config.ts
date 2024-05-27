import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5174
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'src/mixins' as *;
        `
      }
    }
  },
  plugins: [sveltekit()]
})
