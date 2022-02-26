export type AddDeviceModel = {
  id: string
  type: string
  roomId: string
}

export interface IAddDevice {
  add (device: AddDeviceModel, userId: string): Promise<boolean>
}
