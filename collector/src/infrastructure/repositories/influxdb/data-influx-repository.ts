import { IHemsSaveDataRepository } from '@/src/usecases/boundaries/output/repositories/save-hems-data-repository'
import { HemsPayloadModel } from '@/src/entities/hems-data';

import { InfluxHelper } from './influx-helper'
import { Point } from '@influxdata/influxdb-client'

export class DataInfluxRepository implements IHemsSaveDataRepository {

    async save (measures: HemsPayloadModel): Promise<void> {
        measures.forEach(measure => {
            const point = new Point('energy')
            point.tag('hemsId', measure.hemsId)
            point.tag('deviceId', measure.deviceId)
            point.floatField('voltage', measure.voltage)
            point.floatField('current', measure.current)
            point.floatField('activePower', measure.activePower)
            point.floatField('reactivePower', measure.reactivePower)
            point.floatField('apparentPower', measure.apparentPower)
            point.floatField('powerFactor', measure.powerFactor)
            point.timestamp(measure.timestamp);
            InfluxHelper.writeApi.writePoint(point)
        });
        await InfluxHelper.writeApi.flush()
  }
}
