import { Validation } from '@/application/presentation/protocols/validation'
import { FieldValidation } from '../protocols/field-validation'

export class ValidationComposite implements Validation {
  constructor (
    private readonly validators: FieldValidation[]
  ) {}

  validate (fieldName: string, input: object): string {
    const validators = this.validators.filter(v => v.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(input)
      if (error) {
        return error.message
      }
    }
  }
}
