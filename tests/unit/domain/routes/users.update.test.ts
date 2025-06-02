import { describe, it, expect } from 'vitest'
import { UpdateUserRoute } from '../../../../src/domain/routes/users.update.js'
import { User } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'

const mockUser = User.fromRaw({
  id: 123,
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

describe('UpdateUserRoute', () => {
  it('should update a user and return the updated user', async () => {
    const route = new UpdateUserRoute(mockRepo)
    const result = await route.execute({
      user: mockUser,
    })

    expect(result).toEqual(mockUser.toRaw())
  })
})
