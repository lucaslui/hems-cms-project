import { AddRoomRepository } from '@/src/usecases/boundaries/output/repositories/room/add-room-repository'
import { DeleteRoomRepository } from '@/src/usecases/boundaries/output/repositories/room/delete-room-repository'
import { EditRoomRepository } from '@/src/usecases/boundaries/output/repositories/room/edit-room-repository'
import { LoadRoomByIdRepository } from '@/src/usecases/boundaries/output/repositories/room/load-room-by-id-repository'
import { LoadRoomsRepository } from '@/src/usecases/boundaries/output/repositories/room/load-rooms-repository'

import { RoomModel } from '@/src/entities/room'
import { AddRoomModel } from '@/src/usecases/boundaries/input/room/add-room'
import { LoadRoomsQueryModel } from '@/src/usecases/boundaries/input/room/load-rooms'

import { MongoHelper } from './mongo-helper'

export class RoomMongoRepository implements
AddRoomRepository,
DeleteRoomRepository,
EditRoomRepository,
LoadRoomByIdRepository,
LoadRoomsRepository {
  async add (room: AddRoomModel): Promise<RoomModel> {
    const roomCollection = await MongoHelper.getCollection('rooms')
    const result = await roomCollection.insertOne({
      name: room.name,
      type: room.type,
      userId: room.userId
    })
    const roomAdded = result.ops[0]
    return MongoHelper.map(roomAdded)
  }

  async edit (roomId: string, room: AddRoomModel): Promise<void> {
    const roomCollection = await MongoHelper.getCollection('rooms')
    await roomCollection.updateOne({ _id: MongoHelper.toObjectId(roomId) }, { $set: { name: room.name, type: room.type } })
  }

  async delete (roomId: string, userId: string): Promise<void> {
    const roomCollection = await MongoHelper.getCollection('rooms')
    const devicesCollection = await MongoHelper.getCollection('devices')
    await devicesCollection.deleteMany({ roomId })
    await roomCollection.deleteOne({ _id: MongoHelper.toObjectId(roomId) })
  }

  async load (query: LoadRoomsQueryModel): Promise<RoomModel[]> {
    const roomCollection = await MongoHelper.getCollection('rooms')
    const pipeline: object[] = []

    if (query?.userId) {
      pipeline.push({ $match: { userId: query.userId } })
    }

    pipeline.push({
      $sort: { _id: -1 }
    })

    if (query?.page) {
      pipeline.push({ $skip: query.page * 10 - 10 }, { $limit: 10 })
    }

    const rooms = await roomCollection.aggregate(pipeline).toArray()
    return rooms && MongoHelper.mapCollection(rooms)
  }

  async loadById (roomId: string, userId: string): Promise<RoomModel> {
    const roomCollection = await MongoHelper.getCollection('rooms')
    const room = await roomCollection.findOne({ _id: MongoHelper.toObjectId(roomId), userId })
    return room && MongoHelper.map(room)
  }
}
