export const loadTariffPath = {
  tags: ['Tarifas'],
  summary: 'Obter os valores atuais de tarifas',
  description: 'Essa rota só pode ser executada por **usuários autenticados**',
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
            $ref: '#/schemas/tariff'
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
