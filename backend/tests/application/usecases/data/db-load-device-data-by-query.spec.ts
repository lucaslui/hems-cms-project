import { LoadUserByIdRepository } from '@/src/usecases/boundaries/output/repositories/auth/load-user-by-id-repository'
import { LoadMeasuresDataRepository } from '@/src/usecases/boundaries/output/repositories/data/load-measures-data-repository'
import { LoadPointsDataRepository } from '@/src/usecases/boundaries/output/repositories/data/load-points-data-repository copy'
import { LoadData } from '@/src/usecases/interactors/data/load-data'
import { ValueDataModel, MeasureDataModel } from '@/src/entities/data'
import { UserModel } from '@/src/entities/user'
import { LoadDataQueryModel } from '@/src/usecases/boundaries/input/data/load-data-by-query'

const makeFakeAccount = (): UserModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  hemsId: 'any_hems_id',
  createdAt: new Date('2021-01-27T13:23:15.450Z')
})

const makeFakeQuery = (): LoadDataQueryModel => ({
  deviceId: 'any_device_id',
  measureId: 'any_measure',
  granularity: '15',
  startTime: '2020/01/01',
  endTime: '2021/01/01'
})

const makeFakeQueryWithoutMeasureId = (): LoadDataQueryModel => ({
  deviceId: 'any_device_id',
  granularity: '15',
  startTime: '2020/01/01',
  endTime: '2021/01/01'
})

const makeFakePointsData = (): ValueDataModel[] => {
  return ([{
    value: 350.10,
    time: new Date('2021-01-27T13:23:15.450Z')
  },
  {
    value: 350.52,
    time: new Date('2021-01-27T13:23:15.450Z')
  }])
}

const makeFakeMeasuresData = (): MeasureDataModel[] => {
  return ([{
    voltage: 127.3,
    current: 0,
    activePower: 0,
    reactivePower: 0,
    apparentPower: 0,
    powerFactor: 0,
    time: new Date('2021-01-27T13:23:15.450Z')
  }, {
    voltage: 127.3,
    current: 0,
    activePower: 0,
    reactivePower: 0,
    apparentPower: 0,
    powerFactor: 0,
    time: new Date('2021-01-27T13:23:15.450Z')
  }])
}

interface SutTypes {
  sut: LoadData
  loadAccountByIdRepositoryStub: LoadUserByIdRepository
  loadMeasuresDataRepositoryStub: LoadMeasuresDataRepository
  loadPointsDataRepositoryStub: LoadPointsDataRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepositoryStub()
  const loadMeasuresDataRepositoryStub = makeLoadMeasuresDataRepositoryStub()
  const loadPointsDataRepositoryStub = makeLoadPointsDataRepositoryStub()
  const sut = new LoadData(loadAccountByIdRepositoryStub, loadMeasuresDataRepositoryStub, loadPointsDataRepositoryStub)
  return {
    sut,
    loadAccountByIdRepositoryStub,
    loadMeasuresDataRepositoryStub,
    loadPointsDataRepositoryStub
  }
}

const makeLoadMeasuresDataRepositoryStub = (): LoadMeasuresDataRepository => {
  class LoadMeasuresDataRepositoryStub implements LoadMeasuresDataRepository {
    async loadMeasuresData (query: LoadDataQueryModel, hemsId: string): Promise<MeasureDataModel[]> {
      return Promise.resolve(makeFakeMeasuresData())
    }
  }
  return new LoadMeasuresDataRepositoryStub()
}

const makeLoadPointsDataRepositoryStub = (): LoadPointsDataRepository => {
  class LoadPointsDataRepositoryStub implements LoadPointsDataRepository {
    async loadPointsData (query: LoadDataQueryModel, hemsId: string): Promise<ValueDataModel[]> {
      return Promise.resolve(makeFakePointsData())
    }
  }
  return new LoadPointsDataRepositoryStub()
}

const makeLoadAccountByIdRepositoryStub = (): LoadUserByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadUserByIdRepository {
    async loadById (userId: string): Promise<UserModel> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

describe('DbLoadDeviceDataByQuery', () => {
  test('Should calls LoadAccountByTokenRepository with userId', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadAccountSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.loadDeviceData(makeFakeQuery(), 'any_account_id')
    expect(loadAccountSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should return null if LoadAccountByTokenRepository returns false', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const data = await sut.loadDeviceData(makeFakeQuery(), 'any_account_id')
    expect(data).toBeNull()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadDeviceData(makeFakeQuery(), 'any_account_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should calls LoadPointsDataRepository with correct values with measureId sent', async () => {
    const { sut, loadPointsDataRepositoryStub } = makeSut()
    const loadPointsDataSpy = jest.spyOn(loadPointsDataRepositoryStub, 'loadPointsData')
    const query = makeFakeQuery()
    await sut.loadDeviceData(query, 'any_account_id')
    expect(loadPointsDataSpy).toHaveBeenCalledWith(makeFakeQuery(), 'any_hems_id')
  })

  test('Should returns points data or empty array on LoadPointsDataRepository success', async () => {
    const { sut, loadPointsDataRepositoryStub } = makeSut()
    jest.spyOn(loadPointsDataRepositoryStub, 'loadPointsData')
    const query = makeFakeQuery()
    const data = await sut.loadDeviceData(query, 'any_account_id')
    expect(data).toEqual(makeFakePointsData())
  })

  test('Should throw if LoadPointsDataRepository throws', async () => {
    const { sut, loadPointsDataRepositoryStub } = makeSut()
    jest.spyOn(loadPointsDataRepositoryStub, 'loadPointsData').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadDeviceData(makeFakeQuery(), 'any_account_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should calls LoadMeasuresDataRepository with correct values when measureId was not sent', async () => {
    const { sut, loadMeasuresDataRepositoryStub } = makeSut()
    const loadMeasuresDataSpy = jest.spyOn(loadMeasuresDataRepositoryStub, 'loadMeasuresData')
    const query = makeFakeQueryWithoutMeasureId()
    await sut.loadDeviceData(query, 'any_account_id')
    expect(loadMeasuresDataSpy).toHaveBeenCalledWith(query, 'any_hems_id')
  })

  test('Should returns measurement data or empty array on LoadMeasuresDataRepository success', async () => {
    const { sut, loadMeasuresDataRepositoryStub } = makeSut()
    jest.spyOn(loadMeasuresDataRepositoryStub, 'loadMeasuresData')
    const query = makeFakeQueryWithoutMeasureId()
    const data = await sut.loadDeviceData(query, 'any_account_id')
    expect(data).toEqual(makeFakeMeasuresData())
  })

  test('Should throw if LoadMeasuresDataRepository throws', async () => {
    const { sut, loadMeasuresDataRepositoryStub } = makeSut()
    jest.spyOn(loadMeasuresDataRepositoryStub, 'loadMeasuresData').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadDeviceData(makeFakeQueryWithoutMeasureId(), 'any_account_id')
    await expect(promise).rejects.toThrow()
  })
})
