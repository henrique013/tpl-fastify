export type HealthResponse = {
  message: 'OK'
  timestamp: string
  uptime?: number
}

export function route(uptime: boolean): HealthResponse {
  const timestamp = new Date().toISOString()

  const json: HealthResponse = {
    message: 'OK',
    timestamp,
  }

  if (uptime) {
    json.uptime = process.uptime()
  }

  return json
}
