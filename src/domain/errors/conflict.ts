import { BaseError, HttpStatus } from '@domain/errors.js'

export class ConflictError extends BaseError {
  toHttpStatus(): HttpStatus {
    return {
      code: 409,
      name: 'Conflict',
    }
  }
}
