import { Id } from '@app/values/id.js'
import { Name } from '@app/values/name.js'
import { Email } from '@app/values/email.js'
import { BadArgumentError } from '@app/errors.js'

export type UserPayload = {
  id: Id | null
  name: Name
  email: Email
}

export type UserRaw = {
  id: number | null
  name: string
  email: string
}

export class User {
  private readonly _id: Id | null
  private readonly _name: Name
  private readonly _email: Email

  constructor(payload: UserPayload) {
    this._id = payload.id
    this._name = payload.name
    this._email = payload.email
  }

  static fromRaw(raw: UserRaw): User {
    const payload: UserPayload = {
      id: raw.id ? Id.from(raw.id) : null,
      name: Name.from(raw.name),
      email: Email.from(raw.email),
    }
    return new User(payload)
  }

  get id(): Id | null {
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
      id: this._id?.toNumber() ?? null,
      name: this._name.toString(),
      email: this._email.toString(),
    }
  }
}
