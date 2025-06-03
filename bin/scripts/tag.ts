import { execSync } from 'node:child_process'
import { exit } from 'node:process'

const versionType = process.argv[2]

// validate version type
if (!versionType?.match(/^(major|minor|patch)$/)) {
  console.error('Error: Version type must be one of: major, minor, patch')
  exit(1)
}

try {
  // use npm version to create the tag
  execSync(`npm version ${versionType}`, { stdio: 'inherit' })

  // push the commits and tags
  execSync('git push origin', { stdio: 'inherit' })
  execSync('git push origin --tags', { stdio: 'inherit' })
} catch (error) {
  console.error('Error creating tag:', error)
  exit(1)
}
