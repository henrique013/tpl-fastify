import { describe, it, expect } from 'vitest'
import { Email } from '@domain/values/email.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('Email', () => {
  describe('from', () => {
    it('should create instance with valid email', () => {
      const email = Email.from('test@example.com')
      expect(email.toString()).toBe('test@example.com')
    })

    it('should transform email to lowercase and trim', () => {
      const email = Email.from(' Test@example.com ')
      expect(email.toString()).toBe('test@example.com')
    })

    it('should throw BadArgumentError for invalid email', () => {
      expect(() => Email.from('invalid')).toThrow(BadArgumentError)
      expect(() => Email.from('invalid')).toThrow('Email inválido')
    })

    it('should throw BadArgumentError for empty email', () => {
      expect(() => Email.from('')).toThrow(BadArgumentError)
      expect(() => Email.from('')).toThrow('Email inválido')
    })

    it('should throw BadArgumentError for email without @', () => {
      expect(() => Email.from('testexample.com')).toThrow(BadArgumentError)
      expect(() => Email.from('testexample.com')).toThrow('Email inválido')
    })

    it('should throw BadArgumentError for email without domain', () => {
      expect(() => Email.from('test@')).toThrow(BadArgumentError)
      expect(() => Email.from('test@')).toThrow('Email inválido')
    })
  })

  describe('toString', () => {
    it('should return the email value', () => {
      const email = Email.from('test@example.com')
      expect(email.toString()).toBe('test@example.com')
    })
  })
})
