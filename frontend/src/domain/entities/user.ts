import Role from '../enums/role-type'

export type User = {
  id?: string
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
  role?: Role
  createdAt?: string
  hemsId?: string
}
