import { Id } from '@domain/values/id.js'
import { Name } from '@domain/values/name.js'
import { Email } from '@domain/values/email.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

export type UserRaw = {
  id?: number
  name: string
  email: string
}

export class User {
  constructor(
    public id: Id | null,
    public name: Name,
    public email: Email
  ) {}

  static fromRaw(raw: UserRaw): User {
    const id = raw.id ? Id.from(raw.id) : null
    const name = Name.from(raw.name)
    const email = Email.from(raw.email)

    return new User(id, name, email)
  }

  idOrFail(): Id {
    if (!this.id) {
      throw new BadArgumentError('User ID is required')
    }
    return this.id
  }

  toRaw(): UserRaw {
    return {
      ...(this.id ? { id: this.id.toNumber() } : {}),
      name: this.name.toString(),
      email: this.email.toString(),
    }
  }
}
