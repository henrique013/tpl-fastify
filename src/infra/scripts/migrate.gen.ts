import { execSync } from 'node:child_process'
import { exit } from 'node:process'

const migrationName = process.argv[2]

// validate migration name format (must be in format: add-users-table)
if (!migrationName?.match(/^[a-z0-9]+(-[a-z0-9]+)*$/)) {
  console.error('Error: Migration name must be in lowercase alphanumeric format (e.g. add-users-table)')
  exit(1)
}

// generate the migration
try {
  const command = `npx dotenv -e dev/.env -- npx drizzle-kit generate --name ${migrationName}`
  execSync(command, { stdio: 'inherit' })
} catch (error) {
  console.error('Error generating migration:', error)
  exit(1)
}
