import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    // Use node environment for simpler testing (jsdom has ESM issues)
    environment: 'node',

    // File that runs before tests
    setupFiles: ['./src/test/setup.ts'],

    // Enable watch mode (re-runs automatically when saving)
    watch: true,

    // Exclude integration tests from normal test runs
    // Integration tests require backend running and should be executed separately
    exclude: [
      'node_modules',
      'dist'
    ],
  },

  // Resolve configuration for aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
