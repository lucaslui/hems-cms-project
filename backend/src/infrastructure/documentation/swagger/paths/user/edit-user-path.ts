export const editUserPath = {
  tags: ['Usuários (Admin)'],
  summary: 'Vincular um identificador HEMS com um usuário',
  description: 'Essa rota só pode ser executada por um **usuários administradores**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'userId',
    in: 'path',
    description: 'O identificador único da categoria',
    required: true,
    schema: {
      type: 'string'
    }
  }],
  requestBody: {
    required: true,
    description: 'Dados atualizados do usuário',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/userHems'
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
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
