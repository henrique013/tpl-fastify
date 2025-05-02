import { Request, Response } from 'express'
import handler from '@app/routes/index.js'

export default function (_req: Request, res: Response) {
  const json = handler()
  res.json(json)
}
