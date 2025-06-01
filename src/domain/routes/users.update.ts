import { UserRaw } from '@domain/entities/user.js'
import { NotFoundError } from '@domain/errors.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Route } from '@domain/routes.js'
import { Id } from '@domain/values/id.js'
import { Name } from '@domain/values/name.js'
import { Email } from '@domain/values/email.js'

export type UpdateUserReq = {
  id: number
  name: string
  email: string
}

export class UpdateUserRoute implements Route<UpdateUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: UpdateUserReq) {
    const id = Id.from(req.id)
    const user = await this.repo.findById(id)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    user.name = Name.from(req.name)
    user.email = Email.from(req.email)

    const updatedUser = await this.repo.update(user)

    return updatedUser.toRaw()
  }
}
