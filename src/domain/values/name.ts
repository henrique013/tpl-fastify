import { z } from 'zod'
import { BaseValue } from '@domain/values.js'

const MIN_LENGTH = 2
const MAX_LENGTH = 50

const schema = z
  .string()
  .min(MIN_LENGTH, `Nome deve ter no mínimo ${MIN_LENGTH} caracteres`)
  .max(MAX_LENGTH, `Nome deve ter no máximo ${MAX_LENGTH} caracteres`)
  .transform((value) =>
    value
      .split(/\s+/)
      .map((word) => word.trim())
      .join(' ')
  )

export class Name extends BaseValue<string> {
  static readonly MIN_LENGTH = MIN_LENGTH
  static readonly MAX_LENGTH = MAX_LENGTH

  static from(value: string): Name {
    return new Name(value.trim(), schema)
  }

  toString(): string {
    return this._value
  }
}
