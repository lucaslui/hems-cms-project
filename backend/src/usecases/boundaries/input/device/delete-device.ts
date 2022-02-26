export interface IDeleteDevice {
  delete (userId: string, deviceId: string): Promise<boolean>
}
