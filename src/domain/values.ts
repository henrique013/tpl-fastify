import { z } from 'zod'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

export abstract class BaseValue<T> {
  protected readonly _value: T

  protected constructor(value: T, schema: z.ZodSchema<T>) {
    this._value = this.validateOrFail(value, schema)
  }

  protected validateOrFail(value: T, schema: z.ZodSchema<T>): T {
    try {
      return schema.parse(value)
    } catch (error) {
      if (error instanceof z.ZodError && error.errors[0]) {
        throw new BadArgumentError(error.errors[0].message)
      }
      throw error
    }
  }

  abstract toString(): string
}
