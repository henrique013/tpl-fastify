export function route(uptime: boolean): {
  message: string
  timestamp: string
  uptime?: number
} {
  const message = 'OK'
  const timestamp = new Date().toISOString()

  if (uptime) {
    return { message, timestamp, uptime: process.uptime() }
  }

  return { message, timestamp }
}
