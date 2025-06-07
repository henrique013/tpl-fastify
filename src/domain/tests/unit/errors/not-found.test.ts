import { describe, it, expect } from 'vitest'
import { NotFoundError } from '@domain/errors/not-found.js'

describe('NotFoundError', () => {
  it('should return correct HTTP status code and name', () => {
    const error = new NotFoundError('Resource not found')
    const httpStatus = error.toHttpStatus()

    expect(httpStatus).toEqual({
      code: 404,
      name: 'Not Found',
    })
  })

  it('should convert to JSON with message and name', () => {
    const error = new NotFoundError('Resource not found')
    const json = error.toJSON()

    expect(json).toEqual({
      name: 'NotFoundError',
      message: 'Resource not found',
    })
  })

  it('should include extra data in JSON when showExtra is true', () => {
    const extra = { resourceId: 123 }
    const error = new NotFoundError('Resource not found', extra)
    const json = error.toJSON(true)

    expect(json).toEqual({
      name: 'NotFoundError',
      message: 'Resource not found',
      extra,
    })
  })
})
