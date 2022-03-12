import { IHemsSaveDataUsecase, SaveDataRequestModel, SaveDataResponseModel } from '../boundaries/input/hems-save-data'
import { IHemsSaveDataRepository } from '../boundaries/output/repositories/save-hems-data-repository';

export class HemsSaveDataUsecase implements IHemsSaveDataUsecase {

  constructor (
    private readonly hemsSaveDataRepository: IHemsSaveDataRepository
  ) {}

  async save (message: SaveDataRequestModel): Promise<SaveDataResponseModel> {    
    const payload = Buffer.from(message.payload, 'base64').toString('utf8')
    console.log(`Dados recebidos: ${payload}`)
    if (message.topic == 'hems/data') {
        const measures = JSON.parse(payload.replace(/[']/g, '"'))
        measures.map(measure => {
            const hemsData = {
                hemsId: message.hemsId,
                deviceId: measure[7],
                voltage: parseFloat(measure[1]),
                current: parseFloat(measure[2]),
                activePower: parseFloat(measure[3]),
                reactivePower: parseFloat(measure[4]),
                apparentPower: parseFloat(measure[6]),
                powerFactor: parseFloat(measure[5]),
                timestamp: new Date(measure[0])
            }
            return hemsData
        });
        console.log(measures)
        await this.hemsSaveDataRepository.save(measures)          
        console.log('Dados salvos no banco de dados!')
        return ({ result: 'ok' })
    }
    else {
        console.log('Tópico não implementado!')
    }           
    return null
  }
}