import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  API_PORT: z.coerce.number().min(1),
  API_DEBUG: z.coerce.boolean(),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.coerce.number().min(1),
  REDIS_PASS: z.string().min(1),
  REDIS_DB: z.coerce.number().min(0),
  PG_API_URL: z.string().url(),
  PG_MIGRATIONS_URL: z.string().url(),
})

const env = envSchema.parse(process.env)

export default env
