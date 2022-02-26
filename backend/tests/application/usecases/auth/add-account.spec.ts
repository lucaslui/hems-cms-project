import { CreateAccount } from '@/src/usecases/interactors/auth/create-account'
import { LoadUserByEmailRepository } from '@/src/usecases/boundaries/output/repositories/auth/load-user-by-email-repository'
import { UserModel } from '@/src/entities/user'
import { mockAccount, mockAddAccountRequest } from './mocks/data-mocks'
import { AddAccountRepositorySpy, EncrypterSpy, HasherSpy, UpdateAccessTokenRepositorySpy } from './mocks/dependency-mocks'

type SutTypes = {
  sut: CreateAccount
  hasherSpy: HasherSpy
  encrypterSpy: EncrypterSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositoryStub
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const encrypterSpy = new EncrypterSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositoryStub()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new CreateAccount(hasherSpy, encrypterSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy, updateAccessTokenRepositorySpy)
  return {
    sut,
    hasherSpy,
    encrypterSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy,
    updateAccessTokenRepositorySpy
  }
}

class LoadAccountByEmailRepositoryStub implements LoadUserByEmailRepository {
  async loadByEmail (email: string): Promise<UserModel> {
    return Promise.resolve(null)
  }
}

describe('CreateAccount Usecase', () => {
  test('Should call hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const hashSpy = jest.spyOn(hasherSpy, 'hash')
    const accountData = mockAddAccountRequest()
    await sut.add(accountData)
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if hasher throws error', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const accountData = mockAddAccountRequest()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositorySpy, 'add')
    const accountData = mockAddAccountRequest()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws error', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const accountData = mockAddAccountRequest()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should returns an account on success', async () => {
    const { sut } = makeSut()
    const accountData = mockAddAccountRequest()
    const account = await sut.add(accountData)
    expect(account).toEqual({
      name: 'any_name',
      email: 'any_email@mail.com',
      accessToken: 'any_token'
    })
  })

  test('Should returns null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccount()))
    const accountData = mockAddAccountRequest()
    const account = await sut.add(accountData)
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
    await sut.add(mockAddAccountRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
