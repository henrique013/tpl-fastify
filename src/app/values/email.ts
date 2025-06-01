import { z } from 'zod'
import { BaseValue } from '@app/values.js'

const schema = z
  .string()
  .email('Email inválido')
  .transform((value) => value.toLowerCase().trim())

export class Email extends BaseValue<string> {
  static from(value: string): Email {
    return new Email(value, schema)
  }

  toString(): string {
    return this._value
  }
}
