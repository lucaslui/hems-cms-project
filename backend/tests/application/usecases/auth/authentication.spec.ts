import { LoadUserByEmailRepository } from '@/src/usecases/boundaries/output/repositories/auth/load-user-by-email-repository'
import { Authenticate } from '@/src/usecases/interactors/auth/authenticate'
import { UserModel } from '@/src/entities/user'
import { mockAccount, mockAuthenticationRequest } from './mocks/data-mocks'
import { EncrypterSpy, HashComparerSpy, UpdateAccessTokenRepositorySpy } from './mocks/dependency-mocks'

type SutTypes = {
  sut: Authenticate
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositoryStub
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

class LoadAccountByEmailRepositoryStub implements LoadUserByEmailRepository {
  async loadByEmail (email: string): Promise<UserModel> {
    const account: UserModel = mockAccount()
    return Promise.resolve(account)
  }
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositoryStub()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new Authenticate(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('DbAuthentication service', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
    await sut.auth(mockAuthenticationRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthenticationRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockAuthenticationRequest())
    expect(accessToken).toBe(null)
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy } = makeSut()
    const comparerSpy = jest.spyOn(hashComparerSpy, 'compare')
    await sut.auth(mockAuthenticationRequest())
    expect(comparerSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthenticationRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthenticationRequest())
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterSpy } = makeSut()
    const encryptSpy = jest.spyOn(encrypterSpy, 'encrypt')
    await sut.auth(mockAuthenticationRequest())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthenticationRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should returns a token on success', async () => {
    const { sut } = makeSut()
    const account = await sut.auth(mockAuthenticationRequest())
    expect(account).toStrictEqual({
      name: 'any_name',
      email: 'any_email@mail.com',
      accessToken: 'any_token'
    })
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken')
    await sut.auth(mockAuthenticationRequest())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthenticationRequest())
    await expect(promise).rejects.toThrow()
  })
})
