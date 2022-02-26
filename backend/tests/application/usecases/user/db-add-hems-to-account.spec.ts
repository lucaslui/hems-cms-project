import { EditUserHemsRepository } from '@/src/usecases/boundaries/output/repositories/user/edit-user-hems-repository'
import { LoadUserByHemsRepository } from '@/src/usecases/boundaries/output/repositories/user/load-user-by-hems-id-repository'
import { EditUserHems } from '@/src/usecases/interactors/user/edit-user-hems'
import { UserModel } from '@/src/entities/user'
import { IEditUserHems } from '@/src/usecases/boundaries/input/user/edit-user-hems'

interface SutTypes {
  sut: IEditUserHems
  addHemsToAccountRepositoryStub: EditUserHemsRepository
  loadAccountByHemsIdRepositoryStub: LoadUserByHemsRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByHemsIdRepositoryStub = makeLoadAccountByHemsIdRepositoryStub()
  const addHemsToAccountRepositoryStub = makeAddHemsToAccountRepositoryStub()
  const sut = new EditUserHems(addHemsToAccountRepositoryStub, loadAccountByHemsIdRepositoryStub)
  return {
    sut,
    addHemsToAccountRepositoryStub,
    loadAccountByHemsIdRepositoryStub
  }
}

const makeAddHemsToAccountRepositoryStub = (): EditUserHemsRepository => {
  class AddHemsToAccountRepositoryStub implements EditUserHemsRepository {
    async editUserHems (hemsId: string, userId: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddHemsToAccountRepositoryStub()
}

const makeLoadAccountByHemsIdRepositoryStub = (): LoadUserByHemsRepository => {
  class LoadAccountByHemsIdRepositoryStub implements LoadUserByHemsRepository {
    async loadByHems (hemsId: string): Promise<UserModel> {
      return Promise.resolve(null)
    }
  }
  return new LoadAccountByHemsIdRepositoryStub()
}

describe('DbAddHemsToAccount', () => {
  test('Should calls LoadUserByHemsIdRepository with correct values', async () => {
    const { sut, loadAccountByHemsIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByHemsIdRepositoryStub, 'loadByHems')
    await sut.editHems('any_hems_id', 'any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_hems_id')
  })

  test('Should returns false when LoadUserByHemsIdRepository returns an account', async () => {
    const { sut, loadAccountByHemsIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByHemsIdRepositoryStub, 'loadByHems').mockReturnValueOnce(Promise.resolve({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      token: 'any_token',
      hemsId: 'any_hems_id',
      createdAt: new Date('2021-01-27T13:23:15.450Z')
    }
    ))
    const isAdded = await sut.editHems('any_hems_id', 'any_id')
    expect(isAdded).toBeFalsy()
  })

  test('Should throws if LoadUserByHemsIdRepository throws', async () => {
    const { sut, loadAccountByHemsIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByHemsIdRepositoryStub, 'loadByHems').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.editHems('any_hems_id', 'any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should calls AddHemsToAccountRepository with correct values', async () => {
    const { sut, addHemsToAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addHemsToAccountRepositoryStub, 'editUserHems')
    await sut.editHems('any_hems_id', 'any_id')
    expect(addSpy).toHaveBeenCalledWith('any_hems_id', 'any_id')
  })

  test('Should throws if AddHemsToAccountRepository throws', async () => {
    const { sut, addHemsToAccountRepositoryStub } = makeSut()
    jest.spyOn(addHemsToAccountRepositoryStub, 'editUserHems').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.editHems('any_hems_id', 'any_id')
    await expect(promise).rejects.toThrow()
  })
})
