import { MissingParamError } from '@/src/application/errors'
import { RequiredFieldsValidation } from '@/src/application/validation/validators'

const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation('any_field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError is validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
