import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '@infra/orm/schema.js'

export type DrizzlePg = NodePgDatabase<typeof schema>
