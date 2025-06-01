import { z } from 'zod'
import { validateOrFail } from '@app/values.js'

const schema = z
  .string()
  .min(2, 'Nome deve ter no mínimo 2 caracteres')
  .max(50, 'Nome deve ter no máximo 50 caracteres')
  .transform((value) =>
    value
      .trim()
      .split(/\s+/)
      .map((word) => word.trim())
      .join(' ')
  )

export class Name {
  private readonly _value: string

  private constructor(value: string) {
    this._value = value
  }

  static from(value: string): Name {
    validateOrFail(value, schema)
    return new Name(value)
  }

  toString(): string {
    return this._value
  }
}
