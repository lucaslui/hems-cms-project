import { MeasureDataModel, ValueDataModel } from '@/src/entities/data'
import { ILoadData, LoadDataQueryModel } from '@/src/usecases/boundaries/input/data/load-data-by-query'
import { LoadDeviceDataController } from '@/src/application/controllers/data/load-device-data-controller'
import { AccountWithoutBoundHemsError } from '@/src/application/errors/account-without-bound-hems'
import { badRequest, forbidden, serverError } from '@/src/application/helpers/http-helper'
import { IHttpRequest, IValidation } from '@/src/application/protocols'

const makeFakeRequest = (): IHttpRequest => ({
  userId: 'any_account_id',
  params: {
    deviceId: 'any_device_id',
    measureId: 'any_measure',
    granularity: 15,
    startTime: '2020/01/01',
    endTime: '2021/01/01'
  }
})

interface SutType {
  sut: LoadDeviceDataController
  validationStub: IValidation
  loadDeviceDataByQueryStub: ILoadData
}

const makeSut = (): SutType => {
  const validationStub = makeValidationStub()
  const loadDeviceDataByQueryStub = makeLoadDeviceDataByQueryStub()
  const sut = new LoadDeviceDataController(validationStub, loadDeviceDataByQueryStub)
  return {
    sut,
    validationStub,
    loadDeviceDataByQueryStub
  }
}

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadDeviceDataByQueryStub = (): ILoadData => {
  class LoadDeviceDataByQueryStub implements ILoadData {
    async loadDeviceData (query: LoadDataQueryModel, userId: string): Promise<Array<MeasureDataModel | ValueDataModel>> {
      return []
    }
  }
  return new LoadDeviceDataByQueryStub()
}

describe('LoadDeviceDataController', () => {
  test('Should calls Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should returns 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should calls LoadDeviceDataByQuery with queries and userId values', async () => {
    const { sut, loadDeviceDataByQueryStub } = makeSut()
    const loadDeviceDataSpy = jest.spyOn(loadDeviceDataByQueryStub, 'loadDeviceData')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(loadDeviceDataSpy).toHaveBeenCalledWith(httpRequest.params, httpRequest.userId)
  })

  test('Should returns 403 if LoadDeviceDataByQuery fails to return data', async () => {
    const { sut, loadDeviceDataByQueryStub } = makeSut()
    jest.spyOn(loadDeviceDataByQueryStub, 'loadDeviceData').mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccountWithoutBoundHemsError()))
  })

  test('Should returns 500 if LoadDeviceDataByQuery throws', async () => {
    const { sut, loadDeviceDataByQueryStub } = makeSut()
    jest.spyOn(loadDeviceDataByQueryStub, 'loadDeviceData').mockReturnValueOnce(Promise.reject(new Error()))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should returns 200 and any array on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: []
    })
  })
})
