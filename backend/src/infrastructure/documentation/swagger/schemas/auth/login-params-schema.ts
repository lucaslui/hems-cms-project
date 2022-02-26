export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  example: {
    email: 'any_email@mail.com',
    password: 'any_password'
  },
  required: ['email', 'password']
}
