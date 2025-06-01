import { z } from 'zod'
import { validateOrFail } from '@app/values.js'

const schema = z
  .string()
  .email('Email inválido')
  .transform((value) => value.toLowerCase().trim())

export class Email {
  private readonly _value: string

  private constructor(value: string) {
    this._value = value
  }

  static from(value: string): Email {
    validateOrFail(value, schema)
    return new Email(value)
  }

  toString(): string {
    return this._value
  }
}
