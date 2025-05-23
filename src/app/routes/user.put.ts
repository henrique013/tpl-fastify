import { User, UserPayload, UserRaw } from '@app/entities/user.js'
import { IUsersRepo } from '@app/repos/users-repo.js'
import { Id } from '@app/values/id.js'
import { Name } from '@app/values/name.js'
import { Email } from '@app/values/email.js'

export type UpdateUserRequest = {
  name: string
  email: string
}

export async function route(repo: IUsersRepo, id: number, data: UpdateUserRequest): Promise<UserRaw> {
  const userId = Id.from(id)
  const name = Name.from(data.name)
  const email = Email.from(data.email)

  const payload: UserPayload = {
    id: userId,
    name,
    email,
  }

  const user = new User(payload)
  const updatedUser = await repo.update(user)
  const updatedUserRaw = updatedUser.toRaw()

  return updatedUserRaw
}
