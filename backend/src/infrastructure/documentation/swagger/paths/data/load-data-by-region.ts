export const loadDataByRegionPath = {
  tags: ['Dados de Medições'],
  summary: 'Obter os dados agregados dos dispositivos HEMS instalados em determinada região',
  description: 'Essa rota só pode ser executada por **especialistas e administradores**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'regionId',
    in: 'path',
    description: 'Identificador da região onde o dispositivo HEMS está localizado',
    required: true,
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
            $ref: '#/schemas/dataMeasures'
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
