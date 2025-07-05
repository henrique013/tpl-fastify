import { describe, it, expect } from 'vitest'
import { Id } from '@domain/values/id.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('Id', () => {
  describe('constants', () => {
    it('should have correct min and max value constants', () => {
      expect(Id.MIN_VALUE).toBe(1)
      expect(Id.MAX_VALUE).toBe(2_147_483_647)
    })
  })

  describe('from', () => {
    it('should create instance with valid id', () => {
      const id = Id.from(1)
      expect(id.toNumber()).toBe(1)
    })

    it('should throw BadArgumentError when id is not an integer', () => {
      expect(() => Id.from(1.5)).toThrow(BadArgumentError)
      expect(() => Id.from(1.5)).toThrow('ID deve ser um número inteiro')
    })

    it('should throw BadArgumentError when id is negative', () => {
      expect(() => Id.from(-1)).toThrow(BadArgumentError)
      expect(() => Id.from(-1)).toThrow('ID não pode ser negativo')
    })

    it('should throw BadArgumentError when id is less than MIN_VALUE', () => {
      expect(() => Id.from(0)).toThrow(BadArgumentError)
      expect(() => Id.from(0)).toThrow(`ID deve ser maior ou igual a ${Id.MIN_VALUE}`)
    })

    it('should throw BadArgumentError when id is greater than MAX_VALUE', () => {
      expect(() => Id.from(Id.MAX_VALUE + 1)).toThrow(BadArgumentError)
      expect(() => Id.from(Id.MAX_VALUE + 1)).toThrow(`ID deve ser menor ou igual a ${Id.MAX_VALUE}`)
    })
  })

  describe('toNumber', () => {
    it('should return the numeric value', () => {
      const id = Id.from(123)
      expect(id.toNumber()).toBe(123)
    })
  })

  describe('toString', () => {
    it('should return the string representation of the id', () => {
      const id = Id.from(123)
      expect(id.toString()).toBe('123')
    })
  })
})
