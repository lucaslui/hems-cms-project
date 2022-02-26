export const editTariffPath = {
  tags: ['Tarifas'],
  summary: 'Editar os valores de tarifas atuais',
  description: 'Essa rota só pode ser executada por **usuários administradores**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    description: 'Dados atualizados do usuário',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/tariff'
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
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
