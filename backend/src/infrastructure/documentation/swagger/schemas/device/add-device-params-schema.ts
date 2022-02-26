export const addHemsDeviceParamsSchema = {
  type: 'object',
  properties: {
    deviceId: {
      type: 'string'
    },
    deviceType: {
      type: 'string'
    },
    roomId: {
      type: 'string'
    }
  },
  example: {
    deviceId: '001D1291000358C1',
    deviceType: 'freeze',
    roomId: '616496bf0c2cc136517d93e0'
  },
  required: ['deviceId', 'deviceType', 'roomId']
}
