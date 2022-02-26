export const addUserParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    },
    role: {
      type: 'string'
    }
  },
  example: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
    role: 'admin or expert role'
  },
  required: ['name', 'email', 'password', 'passwordConfirmation', 'role']
}
