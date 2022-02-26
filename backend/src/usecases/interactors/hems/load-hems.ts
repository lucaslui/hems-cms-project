import { HemsModel } from '@/src/entities/hems'
import { ILoadHems, LoadHemsQueryModel } from '@/src/usecases/boundaries/input/hems/load-hems'
import { LoadHemsRepository } from '../../boundaries/output/repositories/hems/load-hems-repository'

export class LoadHems implements ILoadHems {
  constructor (
    private readonly loadHemsRepository: LoadHemsRepository
  ) {}

  async load (query: LoadHemsQueryModel): Promise<HemsModel[]> {
    const hems = await this.loadHemsRepository.load(query)
    return hems
  }
}
