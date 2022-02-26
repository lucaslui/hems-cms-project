import { IEditUserHems } from '@/src/usecases/boundaries/input/user/edit-user-hems'
import { EditUserHemsController } from '@/src/application/controllers/user/edit-user-hems-controller'
import { HemsInUseError } from '@/src/application/errors/hems-in-use-error'
import { forbidden, serverError, noContent } from '@/src/application/helpers/http-helper'
import { IHttpRequest, IController } from '@/src/application/protocols'

const makeFakeRequest = (): IHttpRequest => ({
  userId: 'any_account_id',
  params: { hemsId: 'any_hems_id' }
})

interface SutType {
  sut: IController
  addHemsToAccountStub: IEditUserHems
}

const makeSut = (): SutType => {
  const addPropsToAccountStub = makeEditUserHemsStub()
  const sut = new EditUserHemsController(addPropsToAccountStub)
  return {
    sut,
    addHemsToAccountStub: addPropsToAccountStub
  }
}

const makeEditUserHemsStub = (): IEditUserHems => {
  class AddHemsToAccountStub implements IEditUserHems {
    async editHems (hemsId: string, userId: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new AddHemsToAccountStub()
}

describe('RegisterHemsController', () => {
  test('Should calls BindHemsToAccountController with correct values', async () => {
    const { sut, addHemsToAccountStub: addPropsToAccountStub } = makeSut()
    const addSpy = jest.spyOn(addPropsToAccountStub, 'editHems')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(
      httpRequest.params.hemsId,
      httpRequest.userId
    )
  })

  test('Should returns 403 if BindHemsToAccountController fails', async () => {
    const { sut, addHemsToAccountStub: addPropsToAccountStub } = makeSut()
    jest.spyOn(addPropsToAccountStub, 'editHems').mockReturnValueOnce(Promise.resolve(false))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new HemsInUseError()))
  })

  test('Should returns 500 if BindHemsToAccountController throws', async () => {
    const { sut, addHemsToAccountStub: addPropsToAccountStub } = makeSut()
    jest.spyOn(addPropsToAccountStub, 'editHems').mockReturnValueOnce(Promise.reject(new Error()))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should returns 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})
