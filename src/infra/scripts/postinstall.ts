import { execSync } from 'node:child_process'
import { exit } from 'node:process'
import { env } from '@infra/env.js'

// check if we're in development environment
const isDevelopment = env.NODE_ENV !== 'production'

if (isDevelopment) {
  try {
    console.log('Installing lefthook...')
    execSync('lefthook install', { stdio: 'inherit' })
  } catch (error) {
    console.error('Error installing lefthook:', error)
    exit(1)
  }
}
