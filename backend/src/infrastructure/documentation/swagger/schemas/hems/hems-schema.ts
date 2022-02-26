import { deviceSchema } from '../device'

export const hemsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'ID de registro exclusivo do dispositivo HEMS'
    },
    key: {
      type: 'string',
      description: 'Chave do dispositivo em hash, calculada com um hash HMAC-SHA256 da ID de registro e Chave de Grupo'
    },
    regionId: {
      type: 'string',
      description: 'Identificador único da região onde o dispositivo HEMS está instalado'
    },
    devices: deviceSchema
  },
  example: {
    id: 'af00sd91ds23pj31lr',
    key: '$2b$12$jAy1r7n48wDVFC7d3XDuwubNfH5smfgrcCnQN39372Fu3oqrLOsO',
    regionId: '32h765ad23',
    devices: [{
      deviceId: 'device_id_1',
      nickname: 'geladeira'
    }, {
      deviceId: 'device_id_2',
      nickname: 'lavadoura'
    }]
  }
}
