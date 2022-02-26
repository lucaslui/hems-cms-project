import { EditTariffController } from '@/src/application/controllers/tariff/edit-tariff-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditTariff } from '../../usecases/tariff/db-edit-tariff-factory'
import { makeEditTariffValidation } from '../../validations/tariff/edit-tariff-validation-factory'

export const makeEditTariffController = (): IController => {
  const editTariffController = new EditTariffController(makeEditTariffValidation(), makeEditTariff())
  return makeLogControllerDecorator(editTariffController)
}
