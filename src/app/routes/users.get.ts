import { UserRaw } from '@app/entities/user.js'
import { IUsersRepo } from '@app/repos/users-repo.js'

export async function route(repo: IUsersRepo): Promise<UserRaw[]> {
  const users = await repo.findAll()
  const usersRaw = users.map((user) => user.toRaw())
  return usersRaw
}
