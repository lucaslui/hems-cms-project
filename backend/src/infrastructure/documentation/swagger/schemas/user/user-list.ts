export const userListSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificador único do usuário'
    },
    name: {
      type: 'string',
      description: 'Nome do usuário'
    },
    email: {
      type: 'string',
      description: 'E-mail de acesso do usuário'
    },
    role: {
      type: 'string',
      description: 'Função do usuário'
    },
    hemsId: {
      type: 'string',
      description: 'Identificador da controladora HEMS vinculado a conta'
    },
    createdAt: {
      type: 'date',
      description: 'Data de registro do usuário'
    }
  },
  example: {
    id: '507f191e810c19729de860ea',
    name: 'Lucas Lui Motta',
    email: 'lucasluimotta@gmail.com',
    password: 'abc78591e810c18749de860ea507f1301e810c19729de860ea',
    role: 'admin | expert | customer',
    hemsId: '613a25c06bb2840073234fcd',
    createdAt: '2021-01-27T13:23:15.450Z'
  }
}
