import { EditRegionController } from '@/src/application/controllers/region/edit-region-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditRegion } from '../../usecases/region/edit-region-factory'
import { makeEditRegionValidation } from '../../validations/region/edit-region-validation-factory'

export const makeEditRegionController = (): IController => {
  const editRegionController = new EditRegionController(makeEditRegionValidation(),makeEditRegion())
  return makeLogControllerDecorator(editRegionController)
}
