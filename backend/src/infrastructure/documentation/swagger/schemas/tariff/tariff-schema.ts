export const tariffSchema = {
  type: 'object',
  properties: {
    tariffTusd: {
      type: 'string',
      description: 'Tarifa de uso do sistema (TUSD) com tributos'
    },
    tariffTe: {
      type: 'string',
      description: 'Tarifa de consumo de energia (TE) com tributos'
    },
    tariffFlag: {
      type: 'string',
      description: 'Bandeira tarifária (vermelha, amarela e verde)'
    }
  },
  example: {
    tariffTusd: '0.31609757',
    tariffTe: '0.31219513',
    tariffFlag: 'red'
  }
}
