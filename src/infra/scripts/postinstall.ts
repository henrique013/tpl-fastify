import { execSync } from 'node:child_process'
import { exit } from 'node:process'

// check if we're in production environment
const isProduction = process.env['NODE_ENV'] === 'production'

if (isProduction) {
  console.log('Skipping lefthook installation in production environment')
  exit(0)
}

try {
  console.log('Installing lefthook...')
  execSync('lefthook install', { stdio: 'inherit' })
} catch (error) {
  console.error('Error installing lefthook:', error)
  exit(1)
}
