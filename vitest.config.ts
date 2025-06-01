import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    // Node.js environment for tests
    environment: 'node',

    // Test file patterns
    include: ['**/*.{test,spec}.ts'],
    exclude: ['node_modules/**'],

    // Global settings
    globals: true,

    // Coverage settings
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', '**/*.config.{js,ts}', '**/*.d.ts', '**/*.{test,spec}.ts', 'src/infra/**/*.ts'],
    },

    // Timeout for tests
    testTimeout: 10000,

    // Alias settings (same as tsconfig.json)
    alias: {
      '@domain': resolve(__dirname, './src/domain'),
      '@infra': resolve(__dirname, './src/infra'),
    },
  },
})
