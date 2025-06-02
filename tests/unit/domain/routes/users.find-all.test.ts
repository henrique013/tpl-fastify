import { describe, it, expect } from 'vitest'
import { FindAllUsersRoute } from '../../../../src/domain/routes/users.find-all.js'
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

describe('FindAllUsersRoute', () => {
  it('should return all users', async () => {
    const route = new FindAllUsersRoute(mockRepo)
    const result = await route.execute()

    expect(result).toEqual([mockUser.toRaw()])
  })
})
