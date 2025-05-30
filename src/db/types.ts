import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '@db/schema.js'

export type DrizzlePg = NodePgDatabase<typeof schema>
