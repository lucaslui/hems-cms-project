export const addRegionPath = {
  tags: ['Regiões'],
  summary: 'Criar uma região no sistema',
  description: 'Essa rota só pode ser executada por **usuários especialistas e administradores**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addRegionParams'
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
            $ref: '#/schemas/region'
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
