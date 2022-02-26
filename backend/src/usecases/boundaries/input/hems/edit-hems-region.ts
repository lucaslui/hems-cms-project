export interface IEditHemsRegion {
  editRegion (hemsId: string, regionId: string): Promise<boolean>
}
