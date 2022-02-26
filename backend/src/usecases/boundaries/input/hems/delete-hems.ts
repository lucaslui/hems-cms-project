export interface IDeleteHems {
  delete (hemsId: string): Promise<boolean>
}
