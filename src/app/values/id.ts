import { z } from 'zod'
import { BadArgumentError } from '@app/errors.js'

// PostgreSQL int4 positive range: 0 to 2,147,483,647
const MAX_VALUE = 2_147_483_647

const schema = z
  .number()
  .int('ID deve ser um número inteiro')
  .nonnegative('ID não pode ser negativo')
  .max(MAX_VALUE, `ID deve ser menor ou igual a ${MAX_VALUE}`)

export class Id {
  private readonly _value: number

  private constructor(value: number) {
    this._value = value
  }

  static from(value: number): Id {
    try {
      const validatedValue = schema.parse(value)
      return new Id(validatedValue)
    } catch (error) {
      if (error instanceof z.ZodError && error.errors[0]) {
        throw new BadArgumentError(error.errors[0].message)
      }
      throw error
    }
  }

  toNumber(): number {
    return this._value
  }

  toString(): string {
    return this._value.toString()
  }
}
