import { RequiredFieldsValidation } from '@/src/application/validation/validators'
import { IValidation } from '../../../../application/protocols/validation'
import { ValidationComposite } from '../../../../application/validation/composites/validation-composite'

export const makeEditTariffValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['tariffTusd', 'tariffTe','tariffFlag']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
