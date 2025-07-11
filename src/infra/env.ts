import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  APP_NAME: z.string().min(1),
  API_PORT: z.coerce.number().min(1024).max(49151),
  API_DEBUG: z.enum(['true', 'false']).transform((val) => val === 'true'),
  API_CORS_ORIGINS: z.string().min(1),
  REDIS_URL: z.url(),
  PG_API_URL: z.url(),
  PG_MIGRATIONS_URL: z.url(),
  SENTRY_DSN: z.url().optional(),
})

/**
 * The root directory of the project.
 */
export const ROOT_DIR = resolve(__dirname, '../../')

/**
 * The environment variables parsed from the process.env.
 */
export const env = envSchema.parse(process.env)
