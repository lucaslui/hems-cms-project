import { AddDeviceModel } from '@/src/usecases/boundaries/input/device/add-device'
import { EditDeviceModel } from '@/src/usecases/boundaries/input/device/edit-device'
import { AddHemsDeviceRepository } from '@/src/usecases/boundaries/output/repositories/device/add-device-repository'
import { DeleteHemsDeviceRepository } from '@/src/usecases/boundaries/output/repositories/device/delete-device-repository'
import { EditDeviceRepository } from '@/src/usecases/boundaries/output/repositories/device/edit-device-repository'
import { LoadDeviceByIdRepository } from '@/src/usecases/boundaries/output/repositories/device/load-device-by-id-repository'
import { LoadHemsDevicesRepository } from '@/src/usecases/boundaries/output/repositories/device/load-devices-repository'
import { DeviceModel } from '@/src/entities/device'
import { MongoHelper } from './mongo-helper'

export class DeviceMongoRepository implements
AddHemsDeviceRepository,
DeleteHemsDeviceRepository,
EditDeviceRepository,
LoadDeviceByIdRepository,
LoadHemsDevicesRepository {
  async add (device: AddDeviceModel, hemsId: string): Promise<void> {
    const devicesCollection = await MongoHelper.getCollection('devices')
    await devicesCollection.insertOne({
      _id: device.id,
      hemsId,
      type: device.type,
      roomId: device.roomId
    })
  }

  async delete (hemsId: string, deviceId: string): Promise<void> {
    const devicesCollection = await MongoHelper.getCollection('devices')
    await devicesCollection.deleteOne({ _id: deviceId, hemsId })
  }

  async edit (device: EditDeviceModel, hemsId: string): Promise<void> {
    const devicesCollection = await MongoHelper.getCollection('devices')
    await devicesCollection.updateOne({ _id: device.id, hemsId }, { $set: { type: device.type, roomId: device.roomId } })
  }

  async load (hemsId: string, page: number): Promise<DeviceModel[]> {
    const devicesCollection = await MongoHelper.getCollection('devices')
    const pipeline: object[] = []

    pipeline.push({
      $match: { hemsId }
    })

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        type: '$type',
        roomId: '$roomId'
      }
    })

    pipeline.push({
      $sort: { id: -1 }
    })

    if (page) {
      pipeline.push({ $skip: page * 10 - 10 }, { $limit: 10 })
    }

    const devices = await devicesCollection.aggregate(pipeline).toArray()
    return devices
  }

  async loadById (hemsId: string, deviceId: string): Promise<DeviceModel> {
    const devicesCollection = await MongoHelper.getCollection('devices')
    const hems = await devicesCollection.findOne({ _id: deviceId })
    return hems && MongoHelper.map(hems)
  }
}
