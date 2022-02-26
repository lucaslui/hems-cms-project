export const deleteRegionPath = {
  tags: ['Regiões'],
  summary: 'Deletar uma região',
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
  responses: {
    204: {
      description: 'No Content: vínculo realizado com sucesso'
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
