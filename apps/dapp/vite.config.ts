import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { ngrok } from 'vite-plugin-ngrok'

const plugins = [sveltekit()]

if (process.env.NGROK_AUTH_TOKEN) {
  // @ts-ignore
  plugins.push(ngrok(process.env.NGROK_AUTH_TOKEN))
}

export default defineConfig({
  plugins,
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
  },
  ssr: {
    external: ['database', '@prisma/client']
  },
  build: {
    rollupOptions: {
      onLog(level, log, handler) {
        if (level === 'warn' && log.code === 'INVALID_ANNOTATION' && log.id?.includes('ramda')) {
          return
        }
        handler(level, log)
      }
    }
  }
})
