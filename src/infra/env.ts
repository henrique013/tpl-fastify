import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  API_PORT: z.coerce.number().min(1024).max(49151),
  API_DEBUG: z.coerce.boolean(),
  REDIS_URL: z.string().url(),
  PG_API_URL: z.string().url(),
  PG_MIGRATIONS_URL: z.string().url(),
  SENTRY_DSN: z.string().url().optional(),
})

export const env = envSchema.parse(process.env)
