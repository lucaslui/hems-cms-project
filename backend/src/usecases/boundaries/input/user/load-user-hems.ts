export type UserHemsModel = {
  hemsId: string
}

export interface ILoadUserHems {
  loadHems (userId: string): Promise<UserHemsModel>
}
