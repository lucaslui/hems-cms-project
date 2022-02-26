export const addHemsDevicePath = {
  tags: ['Tomadas Inteligentes'],
  summary: 'Cadastrar uma Tomada Inteligente',
  description: 'Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addHemsDeviceParams'
        }
      }
    }
  },
  responses: {
    204: {
      $ref: '#/components/noContent'
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
