import { IValidation } from '../../../../application/protocols/validation'
import { ValidationComposite } from '../../../../application/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '../../../../application/validation/validators'

export const makeAddHemsValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['hemsId', 'regionId', 'mqttUsername', 'mqttPassword']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
