import { dataMeasureSchema } from './data-measure-schema'

export const dataDeviceSchema = {
  type: 'array',
  description: 'Vetor de dispositivos ou tomadas inteligentes na casa',
  items: {
    type: 'object',
    properties: {
      deviceId: {
        type: 'string',
        description: 'Identificador do dispositivo ou tomada inteligente na casa'
      },
      measures: dataMeasureSchema
    }
  }
}
