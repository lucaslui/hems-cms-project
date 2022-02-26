export const userEditSchema = {
  type: 'object',
  description: 'Dados do usuário cliente',
  properties: {
    name: {
      type: 'string',
      description: 'Nome do usuário'
    },
    email: {
      type: 'string',
      description: 'Email do usuário'
    },
    hemsId: {
      type: 'string',
      description: 'Identificador HEMS vinculado ao Usuário'
    }
  },
  example: {
    name: 'James Willies',
    email: 'james_willies@mail.com',
    hemsId: '6118678743c0d6007232b1d7'
  },
  required: [
    'name',
    'email',
    'hemsId'
  ]
}
