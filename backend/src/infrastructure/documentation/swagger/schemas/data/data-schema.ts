import { dataDeviceSchema } from './data-device-schema'

export const dataSchema = {
  type: 'object',
  description: 'Dados de medição',
  properties: {
    id: {
      type: 'string',
      description: 'Identificador único deste registro de dados'
    },
    hemsId: {
      type: 'string',
      description: 'Identificador único do dispositivo Hems'
    },
    devices: dataDeviceSchema
  },
  example: {
    nickname: '# Lucas Lui #'
  },
  required: ['nickname', 'occupation', 'region', 'about', 'interests', 'contact', 'website']
}
