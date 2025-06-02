import { describe, it, expect } from 'vitest'
import { HealthRoute } from '@domain/routes/health.js'

const dateProvider = () => new Date('2024-01-01T00:00:00.000Z')

const mockProcess = {
  uptime: () => 123.45,
} as NodeJS.Process

describe('HealthRoute', () => {
  it('should return health status without uptime', async () => {
    const route = new HealthRoute(mockProcess, dateProvider)
    const result = await route.execute({})

    expect(result).toEqual({
      message: 'OK',
      timestamp: '2024-01-01T00:00:00.000Z',
    })
  })

  it('should return health status with uptime', async () => {
    const route = new HealthRoute(mockProcess, dateProvider)
    const result = await route.execute({ uptime: true })

    expect(result).toEqual({
      message: 'OK',
      timestamp: '2024-01-01T00:00:00.000Z',
      uptime: 123.45,
    })
  })
})
