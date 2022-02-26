export const loadDevicesByDataAdminPath = {
  security: [{
    apiKeyAuth: []
  }],
  tags: ['Tomadas Inteligentes'],
  summary: 'Obter lista de Tomadas Inteligentes a partir dos dados (versão para especialistas e administradores)',
  description: 'Essa rota só pode ser executada por **especialistas e administradores**',
  parameters: [{
    name: 'hemsId',
    in: 'path',
    description: 'O identificador único do dispositivo HEMS',
    required: true,
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
            $ref: '#/schemas/hemsDevice'
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
