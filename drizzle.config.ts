import { defineConfig } from 'drizzle-kit'
import { env } from './src/infra/env'

export default defineConfig({
  out: './src/infra/drizzle/migrations',
  schema: './src/infra/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.PG_MIGRATIONS_URL,
  },
})
