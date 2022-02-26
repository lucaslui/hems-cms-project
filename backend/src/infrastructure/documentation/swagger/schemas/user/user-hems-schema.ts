export const userHemsSchema = {
  type: 'object',
  description: 'HEMS vinculado ao usuário',
  properties: {
    hemsId: {
      type: 'string',
      description: 'Identificador único do HEMS'
    },
    role: {
      type: 'string',
      description: 'Função do usuário no sistema'
    }
  },
  example: {
    hemsId: '613a25c06bb2840073234fcd',
    role: 'admin'
  },
  required: [
    'hemsId',
    'role'
  ]
}
