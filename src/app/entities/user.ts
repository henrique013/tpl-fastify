import { Id } from '@app/values/id.js'
import { Name } from '@app/values/name.js'
import { Email } from '@app/values/email.js'
import { BadArgumentError } from '@app/errors.js'

export type UserPayload = {
  id?: Id
  name: Name
  email: Email
}

export type UserRaw = {
  id?: number
  name: string
  email: string
}

export class User {
  private readonly _id: Id | undefined
  private readonly _name: Name
  private readonly _email: Email

  private constructor(payload: UserPayload) {
    this._id = payload.id
    this._name = payload.name
    this._email = payload.email
  }

  static fromRaw(raw: UserRaw): User {
    const payload: UserPayload = {
      ...(raw.id ? { id: Id.from(raw.id) } : {}),
      name: Name.from(raw.name),
      email: Email.from(raw.email),
    }
    return new User(payload)
  }

  get id(): Id | undefined {
    return this._id
  }

  get name(): Name {
    return this._name
  }

  get email(): Email {
    return this._email
  }

  idOrFail(): Id {
    if (!this._id) {
      throw new BadArgumentError('User ID is required')
    }
    return this._id
  }

  toRaw(): UserRaw {
    return {
      ...(this._id ? { id: this._id.toNumber() } : {}),
      name: this._name.toString(),
      email: this._email.toString(),
    }
  }
}
