export interface DeleteHemsDeviceRepository {
  delete (hemsId: string, deviceId: string): Promise<void>
}
