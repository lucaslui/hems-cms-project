export const addHemsPath = {
  tags: ['HEMS'],
  summary: 'Cadastrar um dispositivo HEMS',
  description: 'Essa rota só pode ser executada por **usuários especialistas e administradores**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addHemsParams'
        }
      }
    }
  },
  responses: {
    204: {
      $ref: '#/components/noContent'
    },
    403: {
      description: 'Forbidden: acesso negado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Access denied or The received HEMS is already registered'
              }
            }
          }
        }
      }
    },
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
