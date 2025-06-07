import { defineConfig } from 'drizzle-kit'
import { env } from '@infra/env.js'

export default defineConfig({
  out: './src/infra/orm/migrations',
  schema: './src/infra/orm/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.PG_MIGRATIONS_URL,
  },
})
