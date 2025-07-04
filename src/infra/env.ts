import { dirname, resolve, basename } from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  API_PORT: z.coerce.number().min(1024).max(49151),
  API_DEBUG: z.enum(['true', 'false']).transform((val) => val === 'true'),
  API_CORS_ORIGINS: z.string().min(1),
  REDIS_URL: z.string().url(),
  PG_API_URL: z.string().url(),
  PG_MIGRATIONS_URL: z.string().url(),
  SENTRY_DSN: z.string().url().optional(),
})

/**
 * The root directory of the project.
 */
export const ROOT_DIR = resolve(__dirname, '../../')

/**
 * The name of the application.
 */
export const APP_NAME = basename(ROOT_DIR)

/**
 * The environment variables parsed from the process.env.
 */
export const env = envSchema.parse(process.env)
