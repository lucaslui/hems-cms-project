export const editRoomPath = {
  tags: ['Cômodos'],
  summary: 'Editar um cômodo',
  description: 'Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'roomId',
    in: 'path',
    description: 'O identificador único do cômodo',
    required: true,
    schema: {
      type: 'string'
    }
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addRoomParams'
        }
      }
    }
  },
  responses: {
    204: {
      description: 'No Content: edição do comôdo realizada com sucesso'
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
