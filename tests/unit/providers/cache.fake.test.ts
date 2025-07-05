import { describe, it, expect, vi } from 'vitest'
import { CacheFakeProvider } from '@infra/providers/cache.fake.js'

describe('CacheFakeProvider', () => {
  describe('get', () => {
    it('should return null when key does not exist', async () => {
      const cache = new CacheFakeProvider()
      const result = await cache.get('non-existent-key')

      expect(result).toBeNull()
    })

    it('should return value when key exists and is not expired', async () => {
      const cache = new CacheFakeProvider()
      const testValue = { data: 'test' }

      await cache.set('test-key', testValue, 3600)
      const result = await cache.get('test-key')

      expect(result).toEqual(testValue)
    })

    it('should return null when key exists but is expired', async () => {
      const cache = new CacheFakeProvider()
      const testValue = { data: 'test' }

      // Mock Date.now to simulate time passage
      const originalNow = Date.now
      vi.spyOn(Date, 'now').mockReturnValue(1000)

      // Set with 1 second TTL
      await cache.set('test-key', testValue, 1)

      // Simulate time passage beyond TTL
      Date.now = vi.fn().mockReturnValue(3000)

      const result = await cache.get('test-key')

      expect(result).toBeNull()

      // Restore original Date.now
      Date.now = originalNow
    })

    it('should remove expired key from cache when accessed', async () => {
      const cache = new CacheFakeProvider()
      const testValue = { data: 'test' }

      // Mock Date.now to simulate time passage
      const originalNow = Date.now
      vi.spyOn(Date, 'now').mockReturnValue(1000)

      // Set with 1 second TTL
      await cache.set('test-key', testValue, 1)

      // Simulate time passage beyond TTL
      Date.now = vi.fn().mockReturnValue(3000)

      // First access should remove expired key
      await cache.get('test-key')

      // Reset time to original
      Date.now = vi.fn().mockReturnValue(1000)

      // Second access should still return null
      const result = await cache.get('test-key')

      expect(result).toBeNull()

      // Restore original Date.now
      Date.now = originalNow
    })

    it('should return correctly typed value', async () => {
      const cache = new CacheFakeProvider()
      const testValue = 'string value'

      await cache.set('test-key', testValue, 3600)
      const result = await cache.get<string>('test-key')

      expect(result).toBe(testValue)
      expect(typeof result).toBe('string')
    })
  })

  describe('set', () => {
    it('should store value with TTL', async () => {
      const cache = new CacheFakeProvider()
      const testValue = { data: 'test' }

      await cache.set('test-key', testValue, 3600)
      const result = await cache.get('test-key')

      expect(result).toEqual(testValue)
    })

    it('should overwrite existing value', async () => {
      const cache = new CacheFakeProvider()
      const firstValue = { data: 'first' }
      const secondValue = { data: 'second' }

      await cache.set('test-key', firstValue, 3600)
      await cache.set('test-key', secondValue, 3600)

      const result = await cache.get('test-key')

      expect(result).toEqual(secondValue)
    })

    it('should handle different data types', async () => {
      const cache = new CacheFakeProvider()

      const stringValue = 'test string'
      const numberValue = 42
      const booleanValue = true
      const objectValue = { key: 'value' }
      const arrayValue = [1, 2, 3]

      await cache.set('string-key', stringValue, 3600)
      await cache.set('number-key', numberValue, 3600)
      await cache.set('boolean-key', booleanValue, 3600)
      await cache.set('object-key', objectValue, 3600)
      await cache.set('array-key', arrayValue, 3600)

      expect(await cache.get('string-key')).toBe(stringValue)
      expect(await cache.get('number-key')).toBe(numberValue)
      expect(await cache.get('boolean-key')).toBe(booleanValue)
      expect(await cache.get('object-key')).toEqual(objectValue)
      expect(await cache.get('array-key')).toEqual(arrayValue)
    })

    it('should correctly calculate expiration time', async () => {
      const cache = new CacheFakeProvider()
      const testValue = { data: 'test' }

      // Mock Date.now to control time
      const originalNow = Date.now
      const currentTime = 1000
      vi.spyOn(Date, 'now').mockReturnValue(currentTime)

      // Set with 5 second TTL
      await cache.set('test-key', testValue, 5)

      // Check value is still there at current time
      const result1 = await cache.get('test-key')
      expect(result1).toEqual(testValue)

      // Advance time to just before expiration
      Date.now = vi.fn().mockReturnValue(currentTime + 4999)
      const result2 = await cache.get('test-key')
      expect(result2).toEqual(testValue)

      // Advance time to after expiration
      Date.now = vi.fn().mockReturnValue(currentTime + 5001)
      const result3 = await cache.get('test-key')
      expect(result3).toBeNull()

      // Restore original Date.now
      Date.now = originalNow
    })
  })
})
