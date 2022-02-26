import { IValidation } from '../../../../application/protocols/validation'
import { ValidationComposite } from '../../../../application/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '../../../../application/validation/validators'

export const makeEditUserProfileValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['cpf', 'rg', 'birthdate', 'cep', 'street', 'number', 'district', 'state', 'city', 'complement', 'phone']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
