import { EmailValidatorAdapter } from '../../../infrastructure/validators/email-validator-adapter'
import { InvalidParamError } from '../../errors'
import { IValidation } from '../../protocols'

export class EmailValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidatorAdapter
  ) { }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
