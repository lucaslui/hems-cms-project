import { SignUpController } from '../../../../application/controllers/auth/signup-controller'
import { IController } from '../../../../application/protocols'
import { makeSignUpValidation } from '../../validations/auth/signup-validation-factory'
import { makeCreateAccount } from '../../usecases/auth/create-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): IController => {
  const signUpController = new SignUpController(makeCreateAccount(), makeSignUpValidation())
  return makeLogControllerDecorator(signUpController)
}
