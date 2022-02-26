export interface DeleteHemsRepository {
  delete (hemsId: string): Promise<void>
}
