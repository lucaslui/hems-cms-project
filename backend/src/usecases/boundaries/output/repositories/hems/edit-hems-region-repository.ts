export interface EditHemsRegionRepository {
  editRegion (hemsId: string, regionId: string): Promise<void>
}
