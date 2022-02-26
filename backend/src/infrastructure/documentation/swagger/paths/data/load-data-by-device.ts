export const hemsDeviceDataPath = {
  tags: ['Dados de Medições'],
  summary: 'Obter dados selecionados da tomada inteligente.',
  description: 'Essa rota só pode ser executada por **usuários autenticados** e opcionalmente com dispositivos HEMS **vinculados a conta**. ' +
               'Caso a requisição especifique o hemsId e o usuário tiver permissão de **admin** então o **valor especificado** será usado. ' +
               'Por outro lado, caso não seja especificado o hemsId ou o usuário **não seja admin**, o **hemsId vinculado** será usado.',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'deviceId',
    in: 'path',
    description: 'O identificador da tomada inteligente',
    required: true,
    schema: {
      type: 'string'
    }
  },
  {
    name: 'hemsId',
    in: 'query',
    description: 'O identificador da controladora hems',
    required: false,
    schema: {
      type: 'string'
    }
  },{
    name: 'measureId',
    in: 'query',
    description: 'O tipo de medida desejada',
    schema: {
      type: 'string',
      enum: ['voltage', 'current', 'activePower', 'reactivePower', 'apparentPower', 'powerFactor']
    }
  }, {
    name: 'granularity',
    in: 'query',
    description: 'O nível de granuralidade desejado (em minutos)',
    schema: {
      type: 'integer',
      enum: [1, 5, 10, 15, 30, 60]
    }
  }, {
    name: 'startTime',
    in: 'query',
    description: 'A data inicial das medições no formato ISO 8601',
    schema: {
      type: 'string',
      format: 'date'
    }
  }, {
    name: 'endTime',
    in: 'query',
    description: 'A data final das medições no formato ISO 8601',
    schema: {
      type: 'string'
    }
  }],
  responses: {
    200: {
      description: 'Ok: dados obtidos com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/dataMeasures'
          }
        }
      }
    },
    400: {
      $ref: '#/components/badRequest'
    },
    403: {
      $ref: '#/components/forbidden'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
