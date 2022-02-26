export const addUserPath = {
  tags: ['Usuários (Admin)'],
  summary: 'Criar uma conta de usuário especialista ou administrador',
  description: 'Essa rota só pode ser executada por **administradores**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addUserParams'
        }
      }
    }
  },
  responses: {
    204: {
      $ref: '#/components/noContent'
    },
    400: {
      $ref: '#/components/badRequest'
    },
    403: {
      $ref: '#/components/forbidden'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
