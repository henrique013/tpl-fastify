import { User, UserPayload, UserRaw } from '@app/entities/user.js'
import { IUsersRepo } from '@app/repos/users-repo.js'
import { Name } from '@app/values/name.js'
import { Email } from '@app/values/email.js'

export type CreateUserRequest = {
  name: string
  email: string
}

export async function route(repo: IUsersRepo, data: CreateUserRequest): Promise<UserRaw> {
  const name = Name.from(data.name)
  const email = Email.from(data.email)

  const payload: UserPayload = {
    name,
    email,
  }

  const user = new User(payload)
  const newUser = await repo.create(user)
  const newUserRaw = newUser.toRaw()

  return newUserRaw
}
