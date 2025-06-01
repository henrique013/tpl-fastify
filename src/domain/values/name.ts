import { z } from 'zod'
import { BaseValue } from '@domain/values.js'

const schema = z
  .string()
  .min(2, 'Nome deve ter no mínimo 2 caracteres')
  .max(50, 'Nome deve ter no máximo 50 caracteres')
  .transform((value) =>
    value
      .split(/\s+/)
      .map((word) => word.trim())
      .join(' ')
  )

export class Name extends BaseValue<string> {
  static from(value: string): Name {
    return new Name(value.trim(), schema)
  }

  toString(): string {
    return this._value
  }
}
