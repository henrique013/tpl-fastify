export type HttpStatus = {
  code: number
  name: string
}

export abstract class BaseError extends Error {
  readonly extra: Record<string, unknown> | undefined

  /**
   * @param message - The error message
   * @param extra - Extra data to include in the error response
   */
  constructor(message: string, extra?: Record<string, unknown>) {
    super(message)
    this.name = this.constructor.name
    this.extra = extra

    // This is needed to make instanceof work correctly
    Object.setPrototypeOf(this, new.target.prototype)
  }

  /**
   * @param showExtra - Whether to include the extra data in the error response
   * @returns The error as a JSON object
   */
  toJSON(showExtra: boolean = false): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      ...(showExtra && this.extra && { extra: this.extra }),
    }
  }

  /**
   * @returns The HTTP status code and name for the error
   */
  abstract toHttpStatus(): HttpStatus
}
