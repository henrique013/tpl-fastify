import { z } from 'zod'
import { BadArgumentError } from '@app/errors.js'

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
    try {
      const validatedValue = schema.parse(value)
      return new Name(validatedValue)
    } catch (error) {
      if (error instanceof z.ZodError && error.errors[0]) {
        throw new BadArgumentError(error.errors[0].message)
      }
      throw error
    }
  }

  toString(): string {
    return this._value
  }
}
