import 'express'
import { Redis } from 'ioredis'
import { Pool, PoolClient } from 'pg'

declare module 'express' {
  interface Application {
    pgPool?: Pool
    redis?: Redis
  }

  interface Request {
    app: Application
    pgPoolClient?: PoolClient
    redis?: Redis
  }
}
