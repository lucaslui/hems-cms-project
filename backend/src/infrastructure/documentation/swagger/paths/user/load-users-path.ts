export const loadUsersPath = {
  tags: ['Usuários (Admin)'],
  summary: 'Obter uma lista com todos os usuários do sistema',
  description: 'Essa rota só pode ser executada por um **usuários administradores**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'page',
    in: 'query',
    description: 'A página de usuários desejada',
    schema: {
      type: 'integer'
    }
  }],
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/schemas/userList'
            }
          }
        }
      }
    },
    403: {
      $ref: '#/components/forbidden'
    },
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
