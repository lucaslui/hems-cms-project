import { UserModel } from '@/src/entities/user'
import { ICheckAccessToken } from '@/src/usecases/boundaries/input/auth/check-access-token'
import { AccessDeniedError } from '@/src/application/errors/access-denied-error'
import { forbidden, ok, serverError } from '@/src/application/helpers/http-helper'
import { AuthMiddleware } from '@/src/application/middlewares/auth-middleware'
import { IHttpRequest, IMiddleware } from '@/src/application/protocols'

const makeFakeRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeFakeAccount = (): UserModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
  createdAt: new Date('2021-01-27T13:23:15.450Z')
})

interface SutTypes {
  sut: IMiddleware
  loadAccountByTokenStub: ICheckAccessToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}

const makeLoadAccountByTokenStub = (): ICheckAccessToken => {
  class LoadAccountByToken implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<UserModel> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByToken()
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in header', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ userId: 'valid_id' }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
