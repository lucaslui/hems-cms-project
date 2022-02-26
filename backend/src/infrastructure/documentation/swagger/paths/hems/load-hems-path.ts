export const loadHemsPath = {
  security: [{
    apiKeyAuth: []
  }],
  tags: ['HEMS'],
  summary: 'Obter lista de dispositivos HEMS',
  description: 'Essa rota só pode ser executada por **usuários especialistas e administradores**',
  parameters: [{
    name: 'regionId',
    in: 'query',
    description: 'Código da região onde o dispositivo HEMS está instalado',
    schema: {
      type: 'string'
    }
  }, {
    name: 'page',
    in: 'query',
    description: 'O número da página que deseja obter a lista (parâmetro de páginação)',
    schema: {
      type: 'string'
    }
  }],
  responses: {
    200: {
      description: 'Ok: dados obtidos com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            description: 'Lista de Tomadas Inteligentes vinculadas ao dispositivo HEMS',
            items: {
              $ref: '#/schemas/hems'
            }
          }
        }
      }
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
