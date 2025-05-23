import { UserRaw } from '@app/entities/user.js'
import { IUsersRepo } from '@app/repos/users-repo.js'
import { Id } from '@app/values/id.js'

export async function route(repo: IUsersRepo, id: number): Promise<UserRaw | null> {
  const userId = Id.from(id)
  const user = await repo.findById(userId)

  if (!user) {
    return null
  }

  await repo.delete(userId)
  return user.toRaw()
}
