import { HemsModel } from '@/src/entities/hems'
import { IAddHems } from '@/src/usecases/boundaries/input/hems/add-hems'
import { IHasher } from '../../boundaries/output/criptography/hasher'
import { AddHemsRepository } from '../../boundaries/output/repositories/hems/add-hems-repository'
import { LoadHemsByIdRepository } from '../../boundaries/output/repositories/hems/load-hems-by-id-repository'
import { LoadRegionByIdRepository } from '../../boundaries/output/repositories/region/load-region-by-id-repository'

export class DbAddHems implements IAddHems {
  constructor (
    private readonly addHemsRepository: AddHemsRepository,
    private readonly loadHemsByIdRepository: LoadHemsByIdRepository,
    private readonly loadRegionsByIdRepository: LoadRegionByIdRepository,
    private readonly hasher: IHasher
  ) { }

  async add (hems: HemsModel): Promise<boolean> {
    const hemsAlreadyRegistered = await this.loadHemsByIdRepository.loadById(hems.id)
    if (!hemsAlreadyRegistered) {
      const region = await this.loadRegionsByIdRepository.loadById(hems.regionId)
      if (region) {
        hems.mqttPassword = await this.hasher.hash(hems.mqttPassword)
        await this.addHemsRepository.add(hems)
        return true
      }
    }
    return false
  }
}
