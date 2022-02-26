export const dataValueSchema = {
  type: 'array',
  description: 'Vetor de valores capturados em determinada medida',
  items: {
    type: 'object',
    properties: {
      value: {
        type: 'string',
        description: 'Valor capturado'
      },
      timeStamp: {
        type: 'string',
        description: 'Data da medição'
      }
    }
  }
}
