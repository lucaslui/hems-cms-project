export const userProfileSchema = {
  type: 'object',
  description: 'Perfil do usuário',
  properties: {
    cpf: {
      type: 'string',
      description: 'CPF do usuário'
    },
    rg: {
      type: 'string',
      description: 'RG do usuário'
    },
    birthdate: {
      type: 'string',
      description: 'Data de nascimento do usuário'
    },
    cep: {
      type: 'string',
      description: 'CEP da casa/empresa do usuário'
    },
    street: {
      type: 'string',
      description: 'Rua da casa/empresa do usuário'
    },
    number: {
      type: 'string',
      description: 'Número da casa/empresa do usuário'
    },
    district: {
      type: 'string',
      description: 'Bairro da casa/empresa do usuário'
    },
    state: {
      type: 'string',
      description: 'Estado onde o usuário mora'
    },
    city: {
      type: 'string',
      description: 'Cidade onde o usuário mora'
    },
    complement: {
      type: 'string',
      description: 'Complementos do endereço do usuário (e.g. apto)'
    },
    phone: {
      type: 'string',
      description: 'Telefone/Celular do usuário'
    }
  },
  example: {
    cpf: 'string',
    rg: 'string',
    birthdate: 'Date',
    cep: 'string',
    street: 'string',
    number: 'string',
    district: 'string',
    state: 'string',
    city: 'string',
    complement: 'string',
    phone: 'string'
  },
  required: [
    'cpf',
    'rg',
    'birthdate',
    'cep',
    'street',
    'number',
    'district',
    'state',
    'city',
    'complement',
    'phone']
}
