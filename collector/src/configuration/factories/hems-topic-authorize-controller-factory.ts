import { HemsMongoRepository } from '@/src/infrastructure/repositories/mongodb/hems-mongo-repository'
import { IController } from '@/src/application/protocols'
import { HemsTopicAuthorizeController } from '@/src/application/controllers/hems-topic-authorize-controller'
import { HemsTopicAuthorizeUsecase } from '@/src/usecases/interactors/hems-topic-authorize'

export const makeHemsTopicAuthorizeController = (): IController => {
  const hemsMongoRepository = new HemsMongoRepository()
  const hemsTopicAuthorizeUsecase = new HemsTopicAuthorizeUsecase(hemsMongoRepository)
  const hemsAuthenticateController = new HemsTopicAuthorizeController(hemsTopicAuthorizeUsecase)
  return hemsAuthenticateController
}
