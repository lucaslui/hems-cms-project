import { AuthorizeRequestModel, AuthorizeResponseModel, IHemsTopicAuthorizeUsecase } from '../boundaries/input/hems-topic-authorize'
import { LoadHemsByIdRepository } from '../boundaries/output/repositories/load-hems-by-id-repository'

export class HemsTopicAuthorizeUsecase implements IHemsTopicAuthorizeUsecase {

  constructor (
    private readonly loadHemsByIdRepository: LoadHemsByIdRepository
  ) {}

  async auth (authorizeData: AuthorizeRequestModel): Promise<AuthorizeResponseModel> {    
    const hems = await this.loadHemsByIdRepository.loadById(authorizeData.hemsId)
    if(hems) {
        if (hems.publishACL.some(item => item === authorizeData.topic)) {
            console.log('Pedido de publicação aprovado!')
            return { result: 'ok' }
        }
        else {
            console.log('Pedido de publicação rejeitado, tópico inválido ou não autorizado!')
            return { result: { error: "some error message" } }
        }
    }        
    return null
  }
}