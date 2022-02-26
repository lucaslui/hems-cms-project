export const editHemsDeviceNicknamePath = {
  tags: ['Tomadas Inteligentes'],
  summary: 'Editar os dados de uma Tomada Inteligente',
  description: 'Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'deviceId',
    in: 'path',
    description: 'O identificador único da Tomada Inteligente',
    required: true,
    schema: {
      type: 'string'
    }
  }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            deviceType: {
              type: 'string'
            },
            roomId: {
              type: 'string'
            }
          },
          example: {
            deviceType: 'freeze',
            roomId: '616496bf0c2cc136517d93e0'
          },
          required: ['deviceType', 'roomId']
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
