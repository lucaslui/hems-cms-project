import { IValidation } from '../../../../application/protocols/validation'
import { ValidationComposite } from '../../../../application/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '../../../../application/validation/validators'

export const makeEditRegionValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['name', 'description']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
