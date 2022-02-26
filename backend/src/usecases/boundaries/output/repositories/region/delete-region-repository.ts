export interface DeleteRegionRepository {
  delete (regionId: string): Promise<void>
}
