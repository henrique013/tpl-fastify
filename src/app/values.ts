import { z } from 'zod'
import { BadArgumentError } from '@app/errors.js'

export abstract class BaseValue<T> {
  protected readonly _value: T

  protected constructor(value: T, schema: z.ZodSchema<T>) {
    this.validateOrFail(value, schema)
    this._value = value
  }

  protected validateOrFail(value: T, schema: z.ZodSchema<T>): void {
    try {
      schema.parse(value)
    } catch (error) {
      if (error instanceof z.ZodError && error.errors[0]) {
        throw new BadArgumentError(error.errors[0].message)
      }
      throw error
    }
  }

  abstract toString(): string
}
