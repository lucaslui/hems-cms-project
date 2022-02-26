import { LoadMeasuresDataRepository } from '@/src/usecases/boundaries/output/repositories/data/load-measures-data-repository'
import { LoadPointsDataRepository } from '@/src/usecases/boundaries/output/repositories/data/load-points-data-repository copy'
import { ValueDataModel, MeasureDataModel } from '@/src/entities/data'
import { LoadDataQueryModel } from '@/src/usecases/boundaries/input/data/load-data-by-query'
import { MongoHelper } from './mongo-helper'

export class DataMongoRepository implements LoadMeasuresDataRepository, LoadPointsDataRepository {
  async loadPointsData (query: LoadDataQueryModel, hemsId: string): Promise<ValueDataModel[]> {
    const dataCollection = await MongoHelper.getCollection('data')
    const pipeline: object[] = []

    pipeline.push({
      $match: {
        $and: [
          { hemsId: hemsId },
          { devices: { $elemMatch: { deviceId: query.deviceId } } },
          { 'devices.measures.timeStamp': { $gte: new Date(query.startTime ? query.startTime : '0'), $lt: new Date(query.endTime ? query.endTime : '275760') } }
        ]
      }
    })

    pipeline.push({
      $project: {
        _id: false,
        devices: {
          $filter: {
            input: '$devices',
            as: 'devices',
            cond: { $eq: ['$$devices.deviceId', query.deviceId] }
          }
        }
      }
    })

    pipeline.push({
      $unwind: {
        path: '$devices'
      }
    })

    pipeline.push({
      $project: {
        measures: {
          $filter: {
            input: '$devices.measures',
            as: 'measures',
            cond: {
              $and: [
                { $gte: ['$$measures.timeStamp', new Date(query.startTime ? query.startTime : '0')] },
                { $lte: ['$$measures.timeStamp', new Date(query.endTime ? query.endTime : '275760')] }
              ]
            }
          }
        }
      }
    })

    pipeline.push({
      $unwind: {
        path: '$measures'
      }
    })

    pipeline.push({
      $project: {
        timeStamp: '$measures.timeStamp',
        value: `$measures.${query.measureId}`
      }
    })

    const data = await dataCollection.aggregate(pipeline).toArray()
    return data
  }

  async loadMeasuresData (query: LoadDataQueryModel, hemsId: string): Promise<MeasureDataModel[]> {
    const dataCollection = await MongoHelper.getCollection('data')
    const pipeline: object[] = []

    pipeline.push({
      $match: {
        $and: [
          { hemsId: hemsId },
          { devices: { $elemMatch: { deviceId: query.deviceId } } },
          { 'devices.measures.timeStamp': { $gte: new Date(query.startTime ? query.startTime : '0'), $lt: new Date(query.endTime ? query.endTime : '275760') } }
        ]
      }
    })

    pipeline.push({
      $project: {
        _id: false,
        devices: {
          $filter: {
            input: '$devices',
            as: 'devices',
            cond: { $eq: ['$$devices.deviceId', query.deviceId] }
          }
        }
      }
    })

    pipeline.push({
      $unwind: {
        path: '$devices'
      }
    })

    pipeline.push({
      $project: {
        measures: {
          $filter: {
            input: '$devices.measures',
            as: 'measures',
            cond: {
              $and: [
                { $gte: ['$$measures.timeStamp', new Date(query.startTime ? query.startTime : '0')] },
                { $lte: ['$$measures.timeStamp', new Date(query.endTime ? query.endTime : '275760')] }
              ]
            }
          }
        }
      }
    })

    pipeline.push({
      $unwind: {
        path: '$measures'
      }
    })

    pipeline.push({
      $project: {
        timeStamp: '$measures.timeStamp',
        voltage: '$measures.voltage',
        current: '$measures.current',
        activePower: '$measures.activePower',
        reactivePower: '$measures.reactivePower',
        apparentPower: '$measures.apparentPower',
        powerFactor: '$measures.powerFactor'
      }
    })

    // pipeline.push({
    //   $sort: { 'measures.timeStamp': 1 }
    // })

    const data = await dataCollection.aggregate(pipeline).toArray()
    return data
  }
}
