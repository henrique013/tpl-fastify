import { describe, it, expect } from 'vitest'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('BadArgumentError', () => {
  it('should return correct HTTP status code and name', () => {
    const error = new BadArgumentError('Invalid argument')
    const httpStatus = error.toHttpStatus()

    expect(httpStatus).toEqual({
      code: 400,
      name: 'Bad Request',
    })
  })

  it('should convert to JSON with message and name', () => {
    const error = new BadArgumentError('Invalid argument')
    const json = error.toJSON()

    expect(json).toEqual({
      name: 'BadArgumentError',
      message: 'Invalid argument',
    })
  })

  it('should include extra data in JSON when showExtra is true', () => {
    const extra = { field: 'value' }
    const error = new BadArgumentError('Invalid argument', extra)
    const json = error.toJSON(true)

    expect(json).toEqual({
      name: 'BadArgumentError',
      message: 'Invalid argument',
      extra,
    })
  })
})
