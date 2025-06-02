import { describe, it, expect } from 'vitest'
import { FindOneUserRoute } from '../users.find-one.js'
import { User } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Id } from '@domain/values/id.js'

const mockUser = User.fromRaw({
  name: 'John Doe',
  email: 'john@example.com',
})

const mockRepo: IUsersRepo = {
  create: async () => mockUser,
  update: async () => mockUser,
  delete: async () => {},
  findById: async () => null,
  findByIdOrFail: async () => mockUser,
  findAll: async () => [mockUser],
}

describe('FindOneUserRoute', () => {
  it('should return a user by id', async () => {
    const route = new FindOneUserRoute(mockRepo)
    const result = await route.execute({
      id: Id.from(123),
    })

    expect(result).toEqual(mockUser.toRaw())
  })
})
