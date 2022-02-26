import { makeLoginValidation } from '@/src/configuration/factories/validations/auth/login-validation-factory'
import { IEmailValidator, IValidation } from '@/src/application/protocols'
import { ValidationComposite } from '@/src/application/validation/composites/validation-composite'
import { RequiredFieldsValidation, EmailValidation } from '@/src/application/validation/validators'

jest.mock('@/src/validation/composites/validation-composite')

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidaton Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
