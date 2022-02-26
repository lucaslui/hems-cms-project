export const regionSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificação única da região'
    },
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
    id: '613105f170ad960072982745',
    name: 'RT-DSP',
    description: 'Laboratório RT-DSP instalado na UNICAMP'
  }
}
