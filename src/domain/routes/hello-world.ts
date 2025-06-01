import { Route } from '@domain/routes.js'

export class HelloWorldRoute implements Route<void, { message: string }> {
  async execute() {
    return {
      message: 'Hello, world!',
    }
  }
}
