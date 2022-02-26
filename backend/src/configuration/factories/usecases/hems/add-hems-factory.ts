import { BcryptAdapter } from '@/src/infrastructure/criptography/bcrypt-adapter'
import { IAddHems } from '@/src/usecases/boundaries/input/hems/add-hems'
import { DbAddHems } from '@/src/usecases/interactors/hems/add-hems'
import { HemsMongoRepository } from '@/src/infrastructure/repositories/mongodb/hems-mongo-repository'
import { RegionMongoRepository } from '@/src/infrastructure/repositories/mongodb/region-mongo-repository'

export const makeAddHems = (): IAddHems => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const hemsMongoRepository = new HemsMongoRepository()
  const regionMongoRepository = new RegionMongoRepository()
  return new DbAddHems(hemsMongoRepository, hemsMongoRepository, regionMongoRepository, bcryptAdapter)
}
