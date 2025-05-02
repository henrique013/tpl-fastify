import { Request, Response, NextFunction } from 'express'

export default async function (req: Request, res: Response, next: NextFunction) {
  req.redis = req.app.redis!
  req.pgPoolClient = await req.app.pgPool!.connect()

  res.on('finish', () => {
    req.pgPoolClient!.release()
  })

  next()
}
