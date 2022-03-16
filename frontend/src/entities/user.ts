import Role from '../application/presentation/enums/role-type'

export type UserModel = {
  id?: string
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
  role?: Role
  createdAt?: string
  hemsId?: string
}
