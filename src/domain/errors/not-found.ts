import { BaseError, HttpStatus } from '@domain/errors.js'

export class NotFoundError extends BaseError {
  toHttpStatus(): HttpStatus {
    return {
      code: 404,
      name: 'Not Found',
    }
  }
}
