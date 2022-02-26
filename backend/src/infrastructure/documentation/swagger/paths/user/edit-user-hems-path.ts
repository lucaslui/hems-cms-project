export const editUserHemsPath = {
  tags: ['Usuários'],
  summary: 'Vincular um identificador HEMS com a conta do usuário',
  description: 'Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'hemsId',
    in: 'path',
    description: 'O identificador único do dispositivo HEMS',
    required: true,
    schema: {
      type: 'string'
    }
  }],
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
