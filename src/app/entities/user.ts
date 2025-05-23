import { Id } from '@app/values/id.js'
import { Name } from '@app/values/name.js'
import { Email } from '@app/values/email.js'

export type UserPayload = {
  id: Id
  name: Name
  email: Email
}

export class User {
  private readonly _id: Id
  private readonly _name: Name
  private readonly _email: Email

  constructor(payload: UserPayload) {
    this._id = payload.id
    this._name = payload.name
    this._email = payload.email
  }

  get id(): Id {
    return this._id
  }

  get name(): Name {
    return this._name
  }

  get email(): Email {
    return this._email
  }
}
