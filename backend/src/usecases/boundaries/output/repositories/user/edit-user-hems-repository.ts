export interface EditUserHemsRepository {
  editUserHems (hemsId: string, userId: string): Promise<void>
}
