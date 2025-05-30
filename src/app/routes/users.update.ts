import { UserRaw } from '@app/entities/user.js'
import { NotFoundError } from '@app/errors.js'
import { IUsersRepo } from '@app/repos/users.js'
import { Route } from '@app/routes.js'
import { Id } from '@app/values/id.js'
import { Name } from '@app/values/name.js'
import { Email } from '@app/values/email.js'

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
