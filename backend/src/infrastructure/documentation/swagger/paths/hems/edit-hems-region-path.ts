export const editHemsRegionPath = {
  tags: ['HEMS'],
  summary: 'Setar ou editar o código de região onde o dispositivo está localizado',
  description: 'Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'hemsId',
    in: 'path',
    description: 'O identificador único do Hems',
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
            regionId: {
              type: 'string'
            }
          },
          example: {
            regionId: '6063ae87566c4c00726f52d8'
          },
          required: ['regionId']
        }
      }
    }
  },
  responses: {
    204: {
      description: 'No Content: vínculo realizado com sucesso'
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
