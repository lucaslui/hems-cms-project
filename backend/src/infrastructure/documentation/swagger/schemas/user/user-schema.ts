import { userProfileSchema } from './user-profile-schema'

export const userSchema = {
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
    password: {
      type: 'string',
      description: 'Senha do usuário'
    },
    profile: userProfileSchema,
    role: {
      type: 'string',
      description: 'Função do usuário'
    },
    hemsId: {
      type: 'string',
      description: 'Identificador do dispositivo HEMS vinculado a conta do usuário'
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
    createdAt: '2021-01-27T13:23:15.450Z'
  }
}
