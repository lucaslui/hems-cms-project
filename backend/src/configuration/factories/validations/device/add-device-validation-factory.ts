import { IValidation } from '../../../../application/protocols/validation'
import { ValidationComposite } from '../../../../application/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '../../../../application/validation/validators'

export const makeAddHemsDeviceValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['deviceId', 'deviceType', 'roomId']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
