import { Request, Response } from 'express'
import { z } from 'zod'
import handler from '@app/routes/system/health.js'

const querySchema = z.object({
  uptime: z.enum(['true', 'false']).optional(),
})

export default function (req: Request, res: Response) {
  const result = querySchema.safeParse(req.query)

  if (!result.success) {
    res.status(400).json({ error: result.error.format() })
    return
  }

  const uptime = result.data.uptime === 'true'

  const json = handler({ uptime })

  res.json(json)
}
