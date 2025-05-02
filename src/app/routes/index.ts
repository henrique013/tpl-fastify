export interface Output {
  message: string
}

export default function (): Output {
  const json: Output = {
    message: 'Hello, world!',
  }

  return json
}
