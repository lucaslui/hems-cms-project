import { HemsAuthenticateController } from '@/src/application/controllers/hems-authenticate-controller'
import { HemsAuthenticateUsecase } from '@/src/usecases/interactors/hems-authenticate'
import { HemsMongoRepository } from '@/src/infrastructure/repositories/mongodb/hems-mongo-repository'
import { BcryptAdapter } from '@/src/infrastructure/criptography/bcrypt-adapter'
import { IController } from '@/src/application/protocols'

export const makeHemsAuthenticateController = (): IController => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const hemsMongoRepository = new HemsMongoRepository()
  const hemsAuthenticateUsecase = new HemsAuthenticateUsecase(hemsMongoRepository, bcryptAdapter)
  const hemsAuthenticateController = new HemsAuthenticateController(hemsAuthenticateUsecase)
  return hemsAuthenticateController
}
