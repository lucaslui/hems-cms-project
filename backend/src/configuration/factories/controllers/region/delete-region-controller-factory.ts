import { DeleteRegionController } from '@/src/application/controllers/region/delete-region-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDeleteRegion } from '../../usecases/region/delete-region-factory'

export const makeDeleteRegionController = (): IController => {
  const deleteRegionController = new DeleteRegionController(makeDeleteRegion())
  return makeLogControllerDecorator(deleteRegionController)
}
