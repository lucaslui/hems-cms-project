import { EmailValidatorAdapter } from '../../../../infrastructure/validators/email-validator-adapter'
import { IValidation } from '../../../../application/protocols/validation'
import { ValidationComposite } from '../../../../application/validation/composites/validation-composite'
import { CompareFieldsValidation , EmailValidation , RequiredFieldsValidation } from '../../../../application/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['name','email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new CompareFieldsValidation('password','passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
