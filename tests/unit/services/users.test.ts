import { User } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { UserService } from '@domain/services/users.js'
import { ConflictError } from '@domain/errors/conflict.js'
import { Id } from '@domain/values/id.js'
import { NotFoundError } from '@domain/errors/not-found.js'
import { CacheFakeProvider } from '@infra/providers/cache.fake.js'
import { describe, expect, it, beforeEach, vi, Mock } from 'vitest'

describe('UserService', () => {
  let service: UserService
  let repo: {
    create: Mock
    update: Mock
    delete: Mock
    findById: Mock
    findByIdOrFail: Mock
    findIdByEmail: Mock
    findAll: Mock
  }
  let cache: CacheFakeProvider

  beforeEach(() => {
    repo = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findById: vi.fn(),
      findByIdOrFail: vi.fn(),
      findIdByEmail: vi.fn(),
      findAll: vi.fn(),
    }

    cache = new CacheFakeProvider()

    service = new UserService(repo as IUsersRepo, cache)
  })

  describe('create', () => {
    it('should create a new user when email does not exist', async () => {
      const user = User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      })

      repo.findIdByEmail.mockResolvedValue(null)
      repo.create.mockResolvedValue(user)

      const result = await service.create(user)

      expect(repo.findIdByEmail).toHaveBeenCalledWith(user.email)
      expect(repo.create).toHaveBeenCalledWith(user)
      expect(result).toBe(user)
    })

    it('should throw ConflictError when email already exists', async () => {
      const user = User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      })

      const existingId = Id.from(1)
      repo.findIdByEmail.mockResolvedValue(existingId)

      await expect(service.create(user)).rejects.toThrow(ConflictError)
      expect(repo.findIdByEmail).toHaveBeenCalledWith(user.email)
      expect(repo.create).not.toHaveBeenCalled()
    })

    it('should throw BadArgumentError when user has ID', async () => {
      const user = User.fromRaw({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })

      await expect(service.create(user)).rejects.toThrow('User ID should not be set when creating a new user')
      expect(repo.findIdByEmail).not.toHaveBeenCalled()
      expect(repo.create).not.toHaveBeenCalled()
    })
  })

  describe('update', () => {
    it('should update user when email does not exist or belongs to same user', async () => {
      const currentUser = User.fromRaw({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })

      const updatedUser = User.fromRaw({
        id: 1,
        name: 'John Doe Updated',
        email: 'john@example.com',
      })

      repo.findByIdOrFail.mockResolvedValue(currentUser)
      repo.findIdByEmail.mockResolvedValue(currentUser.idOrFail())
      repo.update.mockResolvedValue(updatedUser)

      const result = await service.update(updatedUser)

      expect(repo.findByIdOrFail).toHaveBeenCalledWith(updatedUser.idOrFail())
      expect(repo.findIdByEmail).toHaveBeenCalledWith(updatedUser.email)
      expect(repo.update).toHaveBeenCalledWith(updatedUser)
      expect(result).toBe(updatedUser)
    })

    it('should throw ConflictError when email belongs to another user', async () => {
      const updatedUser = User.fromRaw({
        id: 1,
        name: 'John Doe Updated',
        email: 'jane@example.com',
      })

      const otherUserId = Id.from(2)
      repo.findByIdOrFail.mockResolvedValue(updatedUser)
      repo.findIdByEmail.mockResolvedValue(otherUserId)

      await expect(service.update(updatedUser)).rejects.toThrow(ConflictError)
      expect(repo.findByIdOrFail).toHaveBeenCalledWith(updatedUser.idOrFail())
      expect(repo.findIdByEmail).toHaveBeenCalledWith(updatedUser.email)
      expect(repo.update).not.toHaveBeenCalled()
    })

    it('should throw NotFoundError when user does not exist', async () => {
      const updatedUser = User.fromRaw({
        id: 1,
        name: 'John Doe Updated',
        email: 'john@example.com',
      })

      repo.findByIdOrFail.mockRejectedValue(new NotFoundError('User not found'))

      await expect(service.update(updatedUser)).rejects.toThrow(NotFoundError)
      expect(repo.findByIdOrFail).toHaveBeenCalledWith(updatedUser.idOrFail())
      expect(repo.findIdByEmail).not.toHaveBeenCalled()
      expect(repo.update).not.toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    it('should delete user and return deleted user', async () => {
      const user = User.fromRaw({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })

      repo.findByIdOrFail.mockResolvedValue(user)
      repo.delete.mockResolvedValue(user)

      const result = await service.delete(user.idOrFail())

      expect(repo.findByIdOrFail).toHaveBeenCalledWith(user.idOrFail())
      expect(repo.delete).toHaveBeenCalledWith(user.idOrFail())
      expect(result).toBe(user)
    })

    it('should throw NotFoundError when user does not exist', async () => {
      const id = Id.from(1)

      repo.findByIdOrFail.mockRejectedValue(new NotFoundError('User not found'))

      await expect(service.delete(id)).rejects.toThrow(NotFoundError)
      expect(repo.findByIdOrFail).toHaveBeenCalledWith(id)
      expect(repo.delete).not.toHaveBeenCalled()
    })
  })

  describe('findOneOrFail', () => {
    it('should return user when found', async () => {
      const user = User.fromRaw({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })

      repo.findByIdOrFail.mockResolvedValue(user)

      const result = await service.findOneOrFail(user.idOrFail())

      expect(repo.findByIdOrFail).toHaveBeenCalledWith(user.idOrFail())
      expect(result).toBe(user)
    })

    it('should return cached user when available', async () => {
      const user = User.fromRaw({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })

      const cachedUserRaw = user.toRaw()
      const id = user.idOrFail()

      // Mock cache to return cached data
      vi.spyOn(cache, 'get').mockResolvedValue(cachedUserRaw)

      const result = await service.findOneOrFail(id)

      expect(cache.get).toHaveBeenCalledWith(`users:entity:${id.toNumber()}`)
      expect(repo.findByIdOrFail).not.toHaveBeenCalled()
      expect(result).toEqual(user)
    })

    it('should throw NotFoundError when user not found', async () => {
      const id = Id.from(1)

      repo.findByIdOrFail.mockRejectedValue(new NotFoundError('User not found'))

      await expect(service.findOneOrFail(id)).rejects.toThrow(NotFoundError)
      expect(repo.findByIdOrFail).toHaveBeenCalledWith(id)
    })
  })

  describe('findAll', () => {
    it('should return array of users', async () => {
      const users = [
        User.fromRaw({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
        }),
        User.fromRaw({
          id: 2,
          name: 'Jane Doe',
          email: 'jane@example.com',
        }),
      ]

      repo.findAll.mockResolvedValue(users)

      const result = await service.findAll()

      expect(repo.findAll).toHaveBeenCalled()
      expect(result).toBe(users)
    })

    it('should return cached users when available', async () => {
      const users = [
        User.fromRaw({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
        }),
        User.fromRaw({
          id: 2,
          name: 'Jane Doe',
          email: 'jane@example.com',
        }),
      ]

      const cachedUsersRaw = users.map((user) => user.toRaw())

      // Mock cache to return cached data
      vi.spyOn(cache, 'get').mockResolvedValue(cachedUsersRaw)

      const result = await service.findAll()

      expect(cache.get).toHaveBeenCalledWith('users:all_entities')
      expect(repo.findAll).not.toHaveBeenCalled()
      expect(result).toEqual(users)
    })

    it('should return empty array when no users found', async () => {
      repo.findAll.mockResolvedValue([])

      const result = await service.findAll()

      expect(repo.findAll).toHaveBeenCalled()
      expect(result).toEqual([])
    })
  })

  describe('cache invalidation', () => {
    it('should invalidate cache when creating user', async () => {
      const user = User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      })

      repo.findIdByEmail.mockResolvedValue(null)
      repo.create.mockResolvedValue(user)

      const delSpy = vi.spyOn(cache, 'del')

      await service.create(user)

      expect(delSpy).toHaveBeenCalledWith('users:all_entities')
    })

    it('should invalidate specific and general cache when updating user', async () => {
      const user = User.fromRaw({
        id: 1,
        name: 'John Doe Updated',
        email: 'john@example.com',
      })

      repo.findByIdOrFail.mockResolvedValue(user)
      repo.findIdByEmail.mockResolvedValue(user.idOrFail())
      repo.update.mockResolvedValue(user)

      const delSpy = vi.spyOn(cache, 'del')

      await service.update(user)

      expect(delSpy).toHaveBeenCalledWith('users:entity:1')
      expect(delSpy).toHaveBeenCalledWith('users:all_entities')
    })

    it('should invalidate specific and general cache when deleting user', async () => {
      const user = User.fromRaw({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })

      repo.findByIdOrFail.mockResolvedValue(user)
      repo.delete.mockResolvedValue(user)

      const delSpy = vi.spyOn(cache, 'del')

      await service.delete(user.idOrFail())

      expect(delSpy).toHaveBeenCalledWith('users:entity:1')
      expect(delSpy).toHaveBeenCalledWith('users:all_entities')
    })
  })
})
