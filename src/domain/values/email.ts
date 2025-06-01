import { z } from 'zod'
import { BaseValue } from '@domain/values.js'

const schema = z.string().email('Email inválido')

export class Email extends BaseValue<string> {
  static from(value: string): Email {
    return new Email(value.toLowerCase().trim(), schema)
  }

  toString(): string {
    return this._value
  }
}
