export const editRegionPath = {
  tags: ['Regiões'],
  summary: 'Editar uma região',
  description: 'Essa rota só pode ser executada por **usuários especialistas e administradores**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'regionId',
    in: 'path',
    description: 'O identificador único do Hems',
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
          $ref: '#/schemas/addRegionParams'
        }
      }
    }
  },
  responses: {
    204: {
      description: 'No Content: edição da região realizada com sucesso'
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
