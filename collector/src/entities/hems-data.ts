export type HemsDataModel = {
    hemsId: string
    deviceId: string
    voltage: number
    current: number
    activePower: number
    reactivePower: number
    apparentPower: number
    powerFactor: number
    timestamp: Date
}

export type HemsPayloadModel = HemsDataModel[]