export const loadHemsDevicesPath = {
  security: [{
    apiKeyAuth: []
  }],
  tags: ['Tomadas Inteligentes'],
  summary: 'Obter lista de Tomadas Inteligentes',
  description: 'Essa rota só pode ser executada por **usuários autenticados**',
  parameters: [{
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
            $ref: '#/schemas/devices'
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
