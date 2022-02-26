import { IController } from '../../../../application/protocols'
import { LoginController } from '../../../../application/controllers/auth/login-controller'
import { makeLoginValidation } from '../../validations/auth/login-validation-factory'
import { makeAuthenticate } from '../../usecases/auth/authenticate-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): IController => {
  const loginController = new LoginController(makeAuthenticate(), makeLoginValidation())
  return makeLogControllerDecorator(loginController)
}
