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
  private constructor(
    private _id: Id | undefined,
    private _name: Name,
    private _email: Email
  ) {}

  static fromRaw(raw: UserRaw): User {
    const id = raw.id ? Id.from(raw.id) : undefined
    const name = Name.from(raw.name)
    const email = Email.from(raw.email)

    return new User(id, name, email)
  }

  get id(): Id | undefined {
    return this._id
  }

  set id(id: Id) {
    this._id = id
  }

  get name(): Name {
    return this._name
  }

  set name(name: Name) {
    this._name = name
  }

  get email(): Email {
    return this._email
  }

  set email(email: Email) {
    this._email = email
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
