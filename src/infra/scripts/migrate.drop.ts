import { execSync } from 'node:child_process'
import { exit } from 'node:process'

// removes a migration
try {
  execSync('tsx --env-file=.env node_modules/.bin/drizzle-kit drop', { stdio: 'inherit' })
} catch (error) {
  console.error('Error dropping migration:', error)
  exit(1)
}
