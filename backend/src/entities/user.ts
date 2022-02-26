export type UserModel = {
  id: string
  name: string
  email: string
  password?: string
  createdAt?: Date
  role?: string
  profile?: ProfileModel
  hemsId?: string
  token?: string
}

export type ProfileModel = {
  cpf: string
  rg: string
  birthdate: Date
  cep: string
  street: string
  number: string
  district: string
  state: string
  city: string
  complement: string
  phone: string
}
