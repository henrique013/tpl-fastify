import { describe, it, expect } from 'vitest'
import { ConflictError } from '@domain/errors/conflict.js'

describe('ConflictError', () => {
  it('should return correct HTTP status code and name', () => {
    const error = new ConflictError('Resource already exists')
    const httpStatus = error.toHttpStatus()

    expect(httpStatus).toEqual({
      code: 409,
      name: 'Conflict',
    })
  })

  it('should convert to JSON with message and name', () => {
    const error = new ConflictError('Resource already exists')
    const json = error.toJSON()

    expect(json).toEqual({
      name: 'ConflictError',
      message: 'Resource already exists',
    })
  })

  it('should include extra data in JSON when showExtra is true', () => {
    const extra = { resourceId: 123 }
    const error = new ConflictError('Resource already exists', extra)
    const json = error.toJSON(true)

    expect(json).toEqual({
      name: 'ConflictError',
      message: 'Resource already exists',
      extra,
    })
  })
})
