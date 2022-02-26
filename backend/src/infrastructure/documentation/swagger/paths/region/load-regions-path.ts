export const loadRegionsPath = {
  tags: ['Regiões'],
  summary: 'Obter a lista de regiões definida no sistema',
  description: 'Essa rota só pode ser executada por **usuários especialistas e administradores**',
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
