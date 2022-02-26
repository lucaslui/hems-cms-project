import { LoadRegionsController } from '@/src/application/controllers/region/load-regions-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadRegions } from '../../usecases/region/load-regions-factory'

export const makeLoadRegionsController = (): IController => {
  const loadRegionsController = new LoadRegionsController(makeLoadRegions())
  return makeLogControllerDecorator(loadRegionsController)
}
