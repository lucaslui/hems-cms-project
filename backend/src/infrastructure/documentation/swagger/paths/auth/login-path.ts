export const loginPath = {
  tags: ['Autenticação'],
  summary: 'Autenticar usuário',
  description: 'Essa rota pode ser executada por **qualquer usuário**',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/loginParams'
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/account'
          }
        }
      }
    },
    400: {
      $ref: '#/components/badRequest'
    },
    401: {
      $ref: '#/components/unauthorized'
    },
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
