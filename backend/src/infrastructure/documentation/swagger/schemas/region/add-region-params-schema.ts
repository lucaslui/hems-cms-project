export const addRegionParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Nome ou apelido dado a região'
    },
    description: {
      type: 'string',
      description: 'Uma descrição do próposito do agrupamento dos dispositivos para formar essa região'
    }
  },
  example: {
    name: 'RT-DSP',
    description: 'Laboratório RT-DSP instalado na UNICAMP'
  }
}
