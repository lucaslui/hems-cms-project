import { AuthenticationResponseModel, AuthenticationRequestModel, IHemsAuthenticateUsecase } from '../boundaries/input/hems-authenticate'
import { IHashComparer } from '../boundaries/output/criptography/hash-comparer'
import { LoadHemsByIdRepository } from '../boundaries/output/repositories/load-hems-by-id-repository'

export class HemsAuthenticateUsecase implements IHemsAuthenticateUsecase {

  constructor (
    private readonly loadHemsByIdRepository: LoadHemsByIdRepository,
    private readonly hashComparer: IHashComparer,
  ) {}

  async auth (data: AuthenticationRequestModel): Promise<AuthenticationResponseModel> {    
    const hems = await this.loadHemsByIdRepository.loadById(data.hemsId)
    if(hems) {
        const isValid = await this.hashComparer.compare(data.password, hems.password)
        if ((data.username === hems.username) && (isValid)) {
            console.log('Pedido de conexão aprovado!')
            return ({ result: 'ok' })
        }
        else {
            console.log('Pedido de conexão rejeitado, valores de usuário e senha errados!')
            return ({ result: { error: 'not_allowed' } })
        }
    }        
    return null
  }
}