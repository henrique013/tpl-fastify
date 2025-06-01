import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { BaseValue } from '@domain/values.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

// Concrete implementation for testing
class TestValue extends BaseValue<string> {
  constructor(value: string) {
    super(value, z.string().min(3, 'Value must have at least 3 characters'))
  }

  toString(): string {
    return this._value
  }
}

describe('BaseValue', () => {
  describe('constructor', () => {
    it('should create instance with valid value', () => {
      const value = new TestValue('valid')
      expect(value.toString()).toBe('valid')
    })

    it('should throw BadArgumentError when validation fails', () => {
      expect(() => new TestValue('ab')).toThrow(BadArgumentError)
      expect(() => new TestValue('ab')).toThrow('Value must have at least 3 characters')
    })

    it('should throw original error when not a ZodError', () => {
      class TestValueWithError extends BaseValue<string> {
        constructor(value: string) {
          super(
            value,
            z.string().refine(() => {
              throw new Error('Custom error')
            })
          )
        }

        toString(): string {
          return this._value
        }
      }

      expect(() => new TestValueWithError('any')).toThrow('Custom error')
    })
  })

  describe('validateOrFail', () => {
    it('should validate value using schema', () => {
      const value = new TestValue('valid')
      expect(value.toString()).toBe('valid')
    })

    it('should throw BadArgumentError with first ZodError message', () => {
      class TestValueWithMultipleErrors extends BaseValue<string> {
        constructor(value: string) {
          super(value, z.string().min(3, 'Too short').max(5, 'Too long'))
        }

        toString(): string {
          return this._value
        }
      }

      expect(() => new TestValueWithMultipleErrors('ab')).toThrow(BadArgumentError)
      expect(() => new TestValueWithMultipleErrors('ab')).toThrow('Too short')
    })
  })
})
