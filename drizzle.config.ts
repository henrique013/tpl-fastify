import { defineConfig } from 'drizzle-kit'
import env from './src/app/env'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.PG_MIGRATIONS_URL,
  },
})
