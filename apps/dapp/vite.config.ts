import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { ngrok } from 'vite-plugin-ngrok'
import { enhancedImages } from '@sveltejs/enhanced-img'

const plugins = [sveltekit(), enhancedImages()]

if (process.env.NGROK_AUTH_TOKEN) {
  // @ts-ignore
  plugins.push(ngrok(process.env.NGROK_AUTH_TOKEN))
}

export default defineConfig({
  // @ts-ignore
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
