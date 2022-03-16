export type EditUserHemsParams = {
    userId: string
    hemsId: string
    role: string
  }
  
export interface IEditUserHems {
    edit: (params: EditUserHemsParams) => Promise<void>
}