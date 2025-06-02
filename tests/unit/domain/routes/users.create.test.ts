import { describe, it, expect } from 'vitest'
import { CreateUserRoute } from '../../../../src/domain/routes/users.create.js'
import { User } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'

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

describe('CreateUserRoute', () => {
  it('should create a new user and return the created user', async () => {
    const route = new CreateUserRoute(mockRepo)
    const request = {
      user: User.fromRaw({
        name: 'John Doe',
        email: 'john@example.com',
      }),
    }

    const result = await route.execute(request)

    expect(result).toEqual(mockUser.toRaw())
  })
})
