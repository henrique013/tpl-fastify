import { execSync } from 'node:child_process'
import { exit } from 'node:process'

const migrationName = process.argv[2]
const isCustom = process.env['npm_lifecycle_event']?.includes(':custom')

// validate migration name format (must be in format: add-users-table)
if (!migrationName?.match(/^[a-z0-9]+(-[a-z0-9]+)*$/)) {
  console.error('Error: Migration name must be in lowercase alphanumeric format (e.g. add-users-table)')
  console.error('Usage: npm run migrate:gen <migration-name> or npm run migrate:gen:custom <migration-name>')
  exit(1)
}

// generate the migration
try {
  const baseCommand = `tsx --env-file=.env node_modules/.bin/drizzle-kit generate --name ${migrationName}`
  const command = isCustom ? `${baseCommand} --custom` : baseCommand
  execSync(command, { stdio: 'inherit' })
} catch (error) {
  console.error('Error generating migration:', error)
  exit(1)
}
