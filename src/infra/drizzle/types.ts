import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '@drizzle/schema.js'

export type DrizzlePg = NodePgDatabase<typeof schema>
