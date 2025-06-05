import { describe, it, expect } from 'vitest'
import { User } from '../../../../src/domain/entities/user.js'
import { Id } from '@domain/values/id.js'
import { Name } from '@domain/values/name.js'
import { Email } from '@domain/values/email.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('User', () => {
  describe('fromRaw', () => {
    it('should create a user without id', () => {
      const raw = {
        name: 'John Doe',
        email: 'john@example.com',
      }

      const user = User.fromRaw(raw)

      expect(user.id).toBeNull()
      expect(user.name.toString()).toBe('John Doe')
      expect(user.email.toString()).toBe('john@example.com')
    })

    it('should create a user with id', () => {
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
  })

  describe('idOrFail', () => {
    it('should return id when it exists', () => {
      const user = User.fromRaw({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })

      const id = user.idOrFail()

      expect(id).toBeInstanceOf(Id)
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
  })

  describe('property access', () => {
    it('should allow reading and writing properties', () => {
      const user = User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      })

      // Reading properties
      expect(user.name).toBeInstanceOf(Name)
      expect(user.email).toBeInstanceOf(Email)

      // Writing properties
      const newName = Name.from('Jane Doe')
      const newEmail = Email.from('jane@example.com')

      user.name = newName
      user.email = newEmail

      expect(user.name.toString()).toBe('Jane Doe')
      expect(user.email.toString()).toBe('jane@example.com')
    })
  })
})
