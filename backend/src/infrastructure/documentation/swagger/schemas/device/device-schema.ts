export const deviceSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificador unico da Tomada Inteligente'
    },
    type: {
      type: 'string',
      description: 'Tipo de equipamento ligado na tomada'
    },
    roomId: {
      type: 'string',
      description: 'Identificador unico do cômodo onde está a tomada'
    }
  },
  example: {
    id: '001D1291000358C1',
    type: 'freeze',
    roomId: '616496bf0c2cc136517d93e0'
  }
}
