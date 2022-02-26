export const roomSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificação única do cômodo'
    },
    name: {
      type: 'string',
      description: 'Nome dado ao cômodo'
    },
    type: {
      type: 'string',
      description: 'Tipo do cômodo'
    },
    userId: {
      type: 'string',
      description: 'Identificação única do usuário que criou o cômodo'
    }
  },
  example: {
    id: '613105f170ad960072982745',
    name: 'Quarto da Julia',
    type: 'bedroom',
    userId: '613105f170ad960072982324'
  }
}
