import { describe, it, expect } from 'vitest'
import { HelloWorldRoute } from '../../../../src/domain/routes/hello-world.js'

describe('HelloWorldRoute', () => {
  it('should return hello world message', async () => {
    const route = new HelloWorldRoute()
    const result = await route.execute()

    expect(result).toEqual({
      message: 'Hello, world!',
    })
  })
})
