export type HemsDataModel = {
  hemsId: string
  devices: DeviceDataModel[]
  time: Date
}

export type DeviceDataModel = {
  deviceId: string
  measures: MeasureDataModel[]
}

export type MeasureDataModel = {
  voltage: number
  current: number
  activePower: number
  reactivePower: number
  apparentPower: number
  powerFactor: number
  time: Date
}

export type ValueDataModel = {
  value: number
  time: Date
}
