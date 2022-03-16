import { ValidationBuilder } from '@/application/validation/builder/validation-builder'
import { ValidationComposite } from '@/application/validation/composite/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => new ValidationComposite([
  ...ValidationBuilder.field('name').required().min(5).build(),
  ...ValidationBuilder.field('email').required().email().build(),
  ...ValidationBuilder.field('password').required().min(4).build(),
  ...ValidationBuilder.field('passwordConfirmation').required().min(4).sameAs('password').build()
])
