import { BaseError, HttpStatus } from '@domain/errors.js'

export class BadArgumentError extends BaseError {
  toHttpStatus(): HttpStatus {
    return {
      code: 400,
      name: 'Bad Request',
    }
  }
}
