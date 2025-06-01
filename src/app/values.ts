import { z } from 'zod'
import { BadArgumentError } from '@app/errors.js'

export function validateOrFail<T>(value: T, schema: z.ZodSchema<T>): void {
  try {
    schema.parse(value)
  } catch (error) {
    if (error instanceof z.ZodError && error.errors[0]) {
      throw new BadArgumentError(error.errors[0].message)
    }
    throw error
  }
}
