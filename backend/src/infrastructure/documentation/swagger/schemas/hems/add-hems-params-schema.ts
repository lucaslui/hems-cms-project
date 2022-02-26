export const addHemsParamsSchema = {
  type: 'object',
  properties: {
    hemsId: {
      type: 'string'
    }
  },
  example: {
    hemsId: 'hems_1',
    regionId: '613a25c06bb2840073234fcd',
    mqttUsername: 'hems_1',
    mqttPassword: 'hems1020304050'
  },
  required: ['hemsId', 'regionId', 'mqttUsername', 'mqttPassword']
}
