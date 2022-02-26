import { LoadUserByTokenRepository } from '@/src/usecases/boundaries/output/repositories/auth/load-user-by-token-repository'
import { EditUserAccessTokenRepository } from '@/src/usecases/boundaries/output/repositories/auth/edit-user-access-token-repository'
import { EditUserHemsRepository } from '@/src/usecases/boundaries/output/repositories/user/edit-user-hems-repository'
import { LoadUserByEmailRepository } from '@/src/usecases/boundaries/output/repositories/auth/load-user-by-email-repository'
import { LoadUserByIdRepository } from '@/src/usecases/boundaries/output/repositories/auth/load-user-by-id-repository'
import { ProfileModel, UserModel } from '@/src/entities/user'
import { LoadUserByHemsRepository } from '@/src/usecases/boundaries/output/repositories/user/load-user-by-hems-id-repository'
import { AddUserRepository } from '@/src/usecases/boundaries/output/repositories/user/add-user-repository'
import { DeleteUserRepository } from '@/src/usecases/boundaries/output/repositories/user/delete-user-repository'
import { EditUserProfileRepository } from '@/src/usecases/boundaries/output/repositories/user/edit-user-profile-repository'
import { LoadUsersRepository } from '@/src/usecases/boundaries/output/repositories/user/load-users-repository'
import { AddUserModel } from '@/src/usecases/boundaries/input/user/add-user'
import { LoadUsersQueryModel } from '@/src/usecases/boundaries/input/user/load-users'
import { AddAccountRepository } from '@/src/usecases/boundaries/output/repositories/auth/add-account-repository'
import { AddAccountRequestModel } from '@/src/usecases/boundaries/input/auth/create-account'
import { MongoHelper } from './mongo-helper'
import { EditUserRepository } from '@/src/usecases/boundaries/output/repositories/user/edit-user-repository'
import { EditUserModel } from '@/src/usecases/boundaries/input/user/edit-user'

export class UserMongoRepository
implements
  AddAccountRepository,
  AddUserRepository,
  EditUserRepository,
  EditUserAccessTokenRepository,
  EditUserHemsRepository,
  EditUserProfileRepository,
  DeleteUserRepository,
  LoadUsersRepository,
  LoadUserByIdRepository,
  LoadUserByEmailRepository,
  LoadUserByTokenRepository,
  LoadUserByHemsRepository {
  async add (account: AddAccountRequestModel): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne({ ...account, role: 'customer', createdAt: new Date() })
    const user = result.ops[0]
    return MongoHelper.map(user)
  }

  async addWithRole (user: AddUserModel): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.insertOne({ ...user, createdAt: new Date() })
  }

  async edit (user: EditUserModel): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(user.id) }, { $set: { role: user.role, hemsId: user.hemsId } })
  }

  async editProfile (profile: ProfileModel, userId: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(userId) }, { $set: { profile: profile } })
  }

  async editUserHems (hemsId: string, userId: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(userId) }, { $set: { hemsId: hemsId } })
  }

  async updateAccessToken (userId: string, token: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(userId) }, { $set: { accessToken: token } })
  }

  async delete (userId: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    const roomCollection = await MongoHelper.getCollection('rooms')
    const devicesCollection = await MongoHelper.getCollection('devices')
    const rooms = await roomCollection.find({ userId }).toArray()
    const roomsIds = rooms.map(room => room._id.toString())
    await devicesCollection.deleteMany({ roomId: { $in: roomsIds } })
    await roomCollection.deleteMany({ userId })
    await userCollection.deleteOne({ _id: MongoHelper.toObjectId(userId) })
  }

  async load (query: LoadUsersQueryModel): Promise<UserModel[]> {
    const userCollection = await MongoHelper.getCollection('users')
    const pipeline: object[] = []
    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        name: '$name',
        email: '$email',
        role: '$role',
        createdAt: '$createdAt',
        hemsId: '$hemsId'
      }
    })

    pipeline.push({
      $sort: { id: -1 }
    })

    if (query?.page) {
      pipeline.push({ $skip: query.page * 10 - 10 }, { $limit: 10 })
    }
    const users = await userCollection.aggregate(pipeline).toArray()
    return users
  }

  async loadById (userId: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ _id: MongoHelper.toObjectId(userId) })
    return user && MongoHelper.map(user)
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email })
    return user && MongoHelper.map(user)
  }

  async loadByToken (token: string, role?: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ accessToken: token, $or: [{ role }, { role: 'admin' }] })
    return user && MongoHelper.map(user)
  }

  async loadByHems (hemsId: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ hemsId })
    return user && MongoHelper.map(user)
  }
}
