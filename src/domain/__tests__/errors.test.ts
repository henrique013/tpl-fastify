import { describe, it, expect } from 'vitest'
import { BaseError, HttpStatus } from '@domain/errors.js'

// Concrete implementation for testing
class TestError extends BaseError {
  toHttpStatus(): HttpStatus {
    return {
      code: 418,
      name: "I'm a teapot",
    }
  }
}

describe('BaseError', () => {
  it('should set name to constructor name', () => {
    const error = new TestError('Test error')
    expect(error.name).toBe('TestError')
  })

  it('should set message correctly', () => {
    const message = 'Test error message'
    const error = new TestError(message)
    expect(error.message).toBe(message)
  })

  it('should store extra data when provided', () => {
    const extra = { test: 'data' }
    const error = new TestError('Test error', extra)
    expect(error.extra).toBe(extra)
  })

  it('should not include extra data in JSON by default', () => {
    const extra = { test: 'data' }
    const error = new TestError('Test error', extra)
    const json = error.toJSON()

    expect(json).toEqual({
      name: 'TestError',
      message: 'Test error',
    })
  })

  it('should include extra data in JSON when showExtra is true', () => {
    const extra = { test: 'data' }
    const error = new TestError('Test error', extra)
    const json = error.toJSON(true)

    expect(json).toEqual({
      name: 'TestError',
      message: 'Test error',
      extra,
    })
  })

  it('should not include extra data in JSON when showExtra is true but extra is undefined', () => {
    const error = new TestError('Test error')
    const json = error.toJSON(true)

    expect(json).toEqual({
      name: 'TestError',
      message: 'Test error',
    })
  })

  it('should work with instanceof operator', () => {
    const error = new TestError('Test error')
    expect(error instanceof TestError).toBe(true)
    expect(error instanceof BaseError).toBe(true)
    expect(error instanceof Error).toBe(true)
  })
})
