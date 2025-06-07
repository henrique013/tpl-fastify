import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    bail: 1,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', 'src/domain/tests/**', 'src/infra/**', './*.{ts,js}'],
    },
    workspace: [
      {
        test: {
          name: 'domain:unit',
          environment: 'node',
          include: ['src/domain/tests/unit/**/*.test.ts'],
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
