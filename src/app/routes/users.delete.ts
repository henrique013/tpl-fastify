import { UserRaw } from '@app/entities/user.js'
import { NotFoundError } from '@app/errors.js'
import { IUsersRepo } from '@app/repos/users.js'
import { Route } from '@app/routes.js'
import { Id } from '@app/values/id.js'

export type DeleteUserReq = {
  id: number
}

export class DeleteUserRoute implements Route<DeleteUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: DeleteUserReq) {
    const id = Id.from(req.id)
    const user = await this.repo.findById(id)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    await this.repo.delete(id)

    return user.toRaw()
  }
}
