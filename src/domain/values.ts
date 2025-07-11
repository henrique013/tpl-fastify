import { z } from 'zod'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

export abstract class BaseValue<T> {
  protected readonly _value: T

  protected constructor(value: T, schema: z.ZodType<T>) {
    this._value = this.validateOrFail(value, schema)
  }

  protected validateOrFail(value: T, schema: z.ZodType<T>): T {
    try {
      return schema.parse(value)
    } catch (error) {
      if (error instanceof z.ZodError && error.issues[0]) {
        throw new BadArgumentError(error.issues[0].message)
      }
      throw error
    }
  }

  abstract toString(): string
}
