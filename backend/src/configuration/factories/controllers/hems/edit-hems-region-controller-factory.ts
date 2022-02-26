import { EditHemsRegionController } from '@/src/application/controllers/hems/edit-hems-region-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditHemsRegion } from '../../usecases/hems/edit-user-hems-factory'
import { makeEditHemsRegionValidation } from '../../validations/hems/edit-hems-profile-validation-factory'

export const makeEditHemsRegionController = (): IController => {
  const editHemsRegionController = new EditHemsRegionController(makeEditHemsRegionValidation(),makeEditHemsRegion())
  return makeLogControllerDecorator(editHemsRegionController)
}
