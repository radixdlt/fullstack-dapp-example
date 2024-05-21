import { defineConfig } from 'tsup'

export default defineConfig({
  platform: 'node',
  minify: false,
  splitting: false,
  entry: ['src/index.ts'],
  dts: false,
  format: ['cjs'],
  noExternal: ['common', 'queues', 'content', 'database', 'typescript-wallet', 'pino']
})
