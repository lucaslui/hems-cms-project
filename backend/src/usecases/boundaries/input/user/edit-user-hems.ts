export interface IEditUserHems {
  editHems (hemsId: string, userId: string): Promise<boolean>
}
