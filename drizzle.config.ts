import { defineConfig } from 'drizzle-kit'
import { env } from './src/infra/env'

export default defineConfig({
  out: './src/infra/orm/migrations',
  schema: './src/infra/orm/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.PG_MIGRATIONS_URL,
  },
})
