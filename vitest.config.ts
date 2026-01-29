import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    // Use node environment for simpler testing (jsdom has ESM issues)
    environment: 'node',

    // File that runs before tests
    setupFiles: ['./src/test/setup.ts'],

    // Enable watch mode (re-runs automatically when saving)
    watch: true
  },

  // Resolve configuration for aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
