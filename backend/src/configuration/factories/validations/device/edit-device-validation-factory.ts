import { IValidation } from '../../../../application/protocols/validation'
import { ValidationComposite } from '../../../../application/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '../../../../application/validation/validators'

export const makeEditHemsDeviceNicknameValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['deviceType', 'roomId']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
