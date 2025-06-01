import { describe, it, expect } from 'vitest'
import { User } from '@domain/entities/user.js'
import { Id } from '@domain/values/id.js'
import { Name } from '@domain/values/name.js'
import { Email } from '@domain/values/email.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('User', () => {
  describe('fromRaw', () => {
    it('should create user with all fields', () => {
      const raw = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      }

      const user = User.fromRaw(raw)

      expect(user.id?.toNumber()).toBe(1)
      expect(user.name.toString()).toBe('John Doe')
      expect(user.email.toString()).toBe('john@example.com')
    })

    it('should create user without id', () => {
      const raw = {
        name: 'John Doe',
        email: 'john@example.com',
      }

      const user = User.fromRaw(raw)

      expect(user.id).toBeUndefined()
      expect(user.name.toString()).toBe('John Doe')
      expect(user.email.toString()).toBe('john@example.com')
    })

    it('should throw BadArgumentError when name is invalid', () => {
      const raw = {
        name: 'A', // Too short
        email: 'john@example.com',
      }

      expect(() => User.fromRaw(raw)).toThrow(BadArgumentError)
      expect(() => User.fromRaw(raw)).toThrow('Nome deve ter no mínimo 2 caracteres')
    })

    it('should throw BadArgumentError when email is invalid', () => {
      const raw = {
        name: 'John Doe',
        email: 'invalid-email',
      }

      expect(() => User.fromRaw(raw)).toThrow(BadArgumentError)
      expect(() => User.fromRaw(raw)).toThrow('Email inválido')
    })
  })

  describe('getters and setters', () => {
    it('should get and set id', () => {
      const user = User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      })

      const newId = Id.from(2)
      user.id = newId

      expect(user.id?.toNumber()).toBe(2)
    })

    it('should get and set name', () => {
      const user = User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      })

      const newName = Name.from('Jane Doe')
      user.name = newName

      expect(user.name.toString()).toBe('Jane Doe')
    })

    it('should get and set email', () => {
      const user = User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      })

      const newEmail = Email.from('jane@example.com')
      user.email = newEmail

      expect(user.email.toString()).toBe('jane@example.com')
    })
  })

  describe('idOrFail', () => {
    it('should return id when it exists', () => {
      const user = User.fromRaw({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })

      const id = user.idOrFail()
      expect(id.toNumber()).toBe(1)
    })

    it('should throw BadArgumentError when id is undefined', () => {
      const user = User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      })

      expect(() => user.idOrFail()).toThrow(BadArgumentError)
      expect(() => user.idOrFail()).toThrow('User ID is required')
    })
  })

  describe('toRaw', () => {
    it('should convert user with id to raw object', () => {
      const user = User.fromRaw({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })

      const raw = user.toRaw()

      expect(raw).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })
    })

    it('should convert user without id to raw object', () => {
      const user = User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      })

      const raw = user.toRaw()

      expect(raw).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
      })
    })
  })
})
