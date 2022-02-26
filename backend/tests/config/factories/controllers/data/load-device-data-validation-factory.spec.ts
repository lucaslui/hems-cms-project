import { makeLoadDeviceDataValidation } from '@/src/configuration/factories/validations/data/load-device-data-validation-factory'
import { IValidation } from '@/src/application/protocols'
import { ValidationComposite } from '@/src/application/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '@/src/application/validation/validators'

jest.mock('@/src/validation/composites/validation-composite')

describe('LoadDeviceDataValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadDeviceDataValidation()
    const validations: IValidation[] = []
    for (const field of ['deviceId']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
