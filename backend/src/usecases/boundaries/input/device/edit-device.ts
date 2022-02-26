export type EditDeviceModel = {
  id: string
  type: string
  roomId: string
}

export interface IEditDevice {
  editDevice(device: EditDeviceModel, userId: string): Promise<boolean>
}
