import env from '@app/env.js'
import { connectToRedis } from '@app/libs/ioredis.js'
import { connectToPgPool } from '@app/libs/pg.js'
import express, { Application } from 'express'

const app: Application = express()
const port = 3000

/*
 * app dependencies
 */

app.pgPool = await connectToPgPool()
app.redis = await connectToRedis()

/*
 * middlewares
 */

app.use(express.json())
app.use('/', (await import('@express/middlewares/prepare-req.js')).default)
app.use('/', (await import('@express/middlewares/req-counter.js')).default)

/*
 * routes
 */

app.get('/', (await import('@express/routes/index.js')).default)
app.get('/system/health', (await import('@express/routes/system/health.js')).default)

/*
 * server
 */

app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`)
  console.log(`Redis running on ${env.REDIS_HOST}:${env.REDIS_PORT}`)
  console.log(`Postgres running on ${env.POSTGRES_HOST}:${env.POSTGRES_PORT}`)
})
