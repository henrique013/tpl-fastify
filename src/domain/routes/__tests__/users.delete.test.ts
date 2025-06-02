import { describe, it, expect } from 'vitest'
import { DeleteUserRoute } from '../users.delete.js'
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

describe('DeleteUserRoute', () => {
  it('should delete a user and return the deleted user', async () => {
    const route = new DeleteUserRoute(mockRepo)
    const request = {
      id: Id.from(1),
    }

    const result = await route.execute(request)

    expect(result).toEqual(mockUser.toRaw())
  })
})
