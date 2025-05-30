import { Route } from '@app/routes.js'

export class IndexGetRoute implements Route<void, { message: string }> {
  async execute() {
    return {
      message: 'Hello, world!',
    }
  }
}
