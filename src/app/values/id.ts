import { z } from 'zod'
import { BaseValue } from '@app/values.js'

// PostgreSQL int4 positive range: 0 to 2,147,483,647
const MAX_VALUE = 2_147_483_647

const schema = z
  .number()
  .int('ID deve ser um número inteiro')
  .nonnegative('ID não pode ser negativo')
  .max(MAX_VALUE, `ID deve ser menor ou igual a ${MAX_VALUE}`)

export class Id extends BaseValue<number> {
  static from(value: number): Id {
    return new Id(value, schema)
  }

  toNumber(): number {
    return this._value
  }

  toString(): string {
    return this._value.toString()
  }
}
