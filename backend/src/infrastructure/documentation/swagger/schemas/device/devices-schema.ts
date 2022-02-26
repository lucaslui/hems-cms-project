import { deviceSchema } from './device-schema'

export const devicesSchema = {
  type: 'array',
  description: 'Lista de tomadas inteligentes vinculadas ao dispositivo HEMS',
  items: deviceSchema,
  example: [
    {
      id: '001D1291000358C1',
      type: 'freeze',
      roomId: '616496bf0c2cc136517d93e0'
    },
    {
      id: '001D1291000353ER',
      type: 'television',
      roomId: '616496bf0c2cc136517dA32'
    }
  ]
}
