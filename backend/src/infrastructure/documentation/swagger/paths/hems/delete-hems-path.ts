export const deleteHemsPath = {
  tags: ['HEMS'],
  summary: 'Deletar um dispositivo HEMS',
  description: 'Essa rota só pode ser executada por **administradores**',
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
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
