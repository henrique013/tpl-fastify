import { z } from 'zod'
import { BadArgumentError } from '@app/errors.js'

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
    try {
      const validatedValue = schema.parse(value)
      return new Email(validatedValue)
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
