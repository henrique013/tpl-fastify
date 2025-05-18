export type IndexResponse = {
  message: string
}

export function route(): IndexResponse {
  return {
    message: 'Hello, world!',
  }
}
