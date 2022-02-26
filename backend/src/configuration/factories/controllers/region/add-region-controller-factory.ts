import { AddRegionController } from '@/src/application/controllers/region/add-region-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddRegion } from '../../usecases/region/add-region-factory'
import { makeAddRegionValidation } from '../../validations/region/add-region-validation-factory'

export const makeAddRegionController = (): IController => {
  const addRegionController = new AddRegionController(makeAddRegionValidation(),makeAddRegion())
  return makeLogControllerDecorator(addRegionController)
}
