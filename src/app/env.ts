import { z } from 'zod'

const envSchema = z.object({
  API_PORT: z.coerce.number().min(1).default(3000),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.coerce.number().min(1).default(6379),
  REDIS_PASS: z.string().min(1),
  PG_HOST: z.string().min(1),
  PG_PORT: z.coerce.number().min(1).default(5432),
  PG_USER: z.string().min(1),
  PG_PASS: z.string().min(1),
  PG_DB: z.string().min(1),
})

const env = envSchema.parse(process.env)

export default env
