import { Route } from '@domain/routes.js'

export type HealthReq = {
  uptime?: boolean
}

export type HealthResp = {
  message: string
  timestamp: string
  uptime?: number
}

export class HealthRoute implements Route<HealthReq, HealthResp> {
  async execute(req: HealthReq) {
    const timestamp = new Date().toISOString()

    const json: HealthResp = {
      message: 'OK',
      timestamp,
    }

    if (req.uptime) {
      json.uptime = process.uptime()
    }

    return json
  }
}
