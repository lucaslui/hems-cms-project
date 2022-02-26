import { dataValueSchema } from './data-value-schema'

export const dataMeasureSchema = {
  type: 'array',
  description: 'Vetor de medidas capturadas',
  items: {
    type: 'object',
    properties: {
      measureId: {
        type: 'string',
        description: 'Nome da medida capturada'
      },
      values: dataValueSchema
    }
  }
}
