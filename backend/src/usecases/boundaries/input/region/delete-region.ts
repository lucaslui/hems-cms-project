export interface IDeleteRegion {
  delete (regionId: string): Promise<boolean>
}
