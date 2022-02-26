export const accountSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IhjSUA89.eyJpZCI6IjYwMDBhNmUxZmZlNGI0MDgwM'
    },
    name: {
      type: 'string',
      example: 'Lucas Lui Motta'
    },
    email: {
      type: 'string',
      example: 'lucasluimotta@gmail.com'
    }
  }
}
