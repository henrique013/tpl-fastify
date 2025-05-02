export interface Input {
  uptime: boolean
}

export interface Output {
  message: string
  timestamp: string
  uptime?: number
}

export default function (input: Input): Output {
  const { uptime } = input

  const json: Output = {
    message: 'OK',
    timestamp: new Date().toISOString(),
  }

  if (uptime) {
    json.uptime = process.uptime()
  }

  return json
}
