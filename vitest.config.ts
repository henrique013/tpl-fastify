import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', 'tests/**', 'src/infra/**', './*.{ts,js}'],
    },
    workspace: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/unit/**/*.test.ts'],
          globals: true,
          testTimeout: 10000,
          alias: {
            '@domain': resolve(__dirname, './src/domain'),
            '@infra': resolve(__dirname, './src/infra'),
          },
        },
      },
    ],
  },
})
