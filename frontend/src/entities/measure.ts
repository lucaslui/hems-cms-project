export type Measure = {
  voltage: number
  current: number
  activePower: number
  reactivePower: number
  apparentPower: number
  powerFactor: number
  time: string
}

export type PointDataModel = {
  value: number
  time: string
}
