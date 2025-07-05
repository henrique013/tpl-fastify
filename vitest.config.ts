import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    bail: 1,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/domain/**/*.ts', 'src/infra/**/*.fake.ts'],
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
