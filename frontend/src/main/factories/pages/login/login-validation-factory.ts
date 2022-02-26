import { ValidationBuilder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/composite/validation-composite'

export const makeLoginValidation = (): ValidationComposite => new ValidationComposite([
  ...ValidationBuilder.field('email').required().email().build(),
  ...ValidationBuilder.field('password').required().min(4).build()
])
