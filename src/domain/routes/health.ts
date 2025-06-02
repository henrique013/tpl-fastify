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
  constructor(
    private readonly process: NodeJS.Process,
    private readonly dateProvider: () => Date
  ) {}

  async execute(req: HealthReq) {
    const timestamp = this.dateProvider().toISOString()

    const json: HealthResp = {
      message: 'OK',
      timestamp,
    }

    if (req.uptime) {
      json.uptime = this.process.uptime()
    }

    return json
  }
}
