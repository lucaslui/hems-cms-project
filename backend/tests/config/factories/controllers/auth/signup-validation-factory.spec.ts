import { makeSignUpValidation } from '@/src/configuration/factories/validations/auth/signup-validation-factory'
import { IEmailValidator, IValidation } from '@/src/application/protocols'
import { ValidationComposite } from '@/src/application/validation/composites/validation-composite'
import { RequiredFieldsValidation, CompareFieldsValidation, EmailValidation } from '@/src/application/validation/validators'

jest.mock('@/src/validation/composites/validation-composite')

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidaton Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name','email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new CompareFieldsValidation('password','passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
