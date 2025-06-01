import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HealthRoute } from '@domain/routes/health.js'

describe('HealthRoute', () => {
  let route: HealthRoute

  beforeEach(() => {
    route = new HealthRoute()
    vi.useFakeTimers()
  })

  describe('execute', () => {
    it('should return basic health info without uptime', async () => {
      const mockDate = new Date('2024-01-01T00:00:00.000Z')
      vi.setSystemTime(mockDate)

      const result = await route.execute({})

      expect(result).toEqual({
        message: 'OK',
        timestamp: '2024-01-01T00:00:00.000Z',
      })
    })

    it('should include uptime when requested', async () => {
      const mockDate = new Date('2024-01-01T00:00:00.000Z')
      vi.setSystemTime(mockDate)

      // Mock process.uptime to return a fixed value
      const mockUptime = 3600 // 1 hour in seconds
      vi.spyOn(process, 'uptime').mockReturnValue(mockUptime)

      const result = await route.execute({ uptime: true })

      expect(result).toEqual({
        message: 'OK',
        timestamp: '2024-01-01T00:00:00.000Z',
        uptime: mockUptime,
      })
    })
  })
})
