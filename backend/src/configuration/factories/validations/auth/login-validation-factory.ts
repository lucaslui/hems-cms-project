import { EmailValidatorAdapter } from '../../../../infrastructure/validators/email-validator-adapter'
import { IValidation } from '../../../../application/protocols/validation'
import { ValidationComposite } from '../../../../application/validation/composites/validation-composite'
import { EmailValidation , RequiredFieldsValidation } from '../../../../application/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
